import { z } from 'zod';
import ApiError from '../utils/ApiError.js';

/**
 * Generic Zod validation middleware factory
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {Object} options - Validation options
 * @param {string[]} options.jsonFields - Array of body field names that may be JSON strings and should be parsed
 * @param {Object} options.requireFiles - Object listing required files and expected counts, e.g. { profileImage: 1, projectImage: 3 }
 * @returns {import('express').RequestHandler} Express middleware function
 */
export const validateZod = (schema, options = {}) => {
  const jsonFields = options.jsonFields || [];
  const requireFiles = options.requireFiles || {};

  const parseIfJsonString = (val) => {
    if (typeof val !== 'string') return val;
    try {
      return JSON.parse(val);
    } catch (e) {
      // If not JSON, return original string (some fields may legitimately be strings)
      return val;
    }
  };

  return (req, res, next) => {
    // Build input object from req.body, parsing listed JSON-like fields
    const input = {};
    for (const key of Object.keys(req.body || {})) {
      if (jsonFields.includes(key)) input[key] = parseIfJsonString(req.body[key]);
      else input[key] = req.body[key];
    }

    // Ensure fields that weren't present on req.body but are expected are included as undefined
    for (const key of jsonFields) {
      if (!(key in input)) input[key] = undefined;
    }

    // Validate files presence if required
    if (requireFiles && Object.keys(requireFiles).length > 0) {
      const fileErrors = [];
      for (const [field, count] of Object.entries(requireFiles)) {
        const actual = req.files?.[field];
        if (!actual || actual.length < count) {
          fileErrors.push({ field, message: `Expected ${count} file(s) for '${field}'` });
        }
      }
      if (fileErrors.length) return res.status(400).json({ success: false, errors: fileErrors });
    }

    try {
      // Run zod validation
      const result = schema.safeParse(input);
      if (!result.success) {
        // Map zod issues to a structured error format
        const errors = result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
          received: issue.received
        }));

        throw new ApiError(400, "Validation failed", errors);
      }

      // Clean undefined and null values from the validated data
      const cleanData = Object.entries(result.data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Attach the validated and cleaned data to req.validatedBody
      req.validatedBody = cleanData;
      return next();
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          errors: error.errors
        });
      }

      // Handle unexpected errors
      console.error('Validation error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during validation',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
};

export default validateZod;
