import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers) => {
      // Add any auth headers if needed
      // headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Portfolio'],
  endpoints: (builder) => ({
    // ============================================================
    // GET ALL PORTFOLIOS
    // ============================================================
    getPortfolios: builder.query({
      query: ({ page = 1, limit = 10, skill, role, search, sortBy, order } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (skill) params.append('skill', skill);
        if (role) params.append('role', role);
        if (search) params.append('search', search);
        if (sortBy) params.append('sortBy', sortBy);
        if (order) params.append('order', order);
        
        return `/portfolio?${params.toString()}`;
      },
      // ✅ Transform response to match component expectations
      transformResponse: (response) => {
        return {
          portfolios: response.data || [],
          pagination: response.meta?.pagination || {
            page: 1,
            limit: 10,
            totalResults: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false
          },
          success: response.success,
          message: response.message
        };
      },
      // ✅ Handle errors gracefully
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to fetch portfolios',
          errors: response.data?.errors || []
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.portfolios.map(({ _id }) => ({ type: 'Portfolio', id: _id })),
              { type: 'Portfolio', id: 'LIST' },
            ]
          : [{ type: 'Portfolio', id: 'LIST' }],
    }),

    // ============================================================
    // GET SINGLE PORTFOLIO BY ID
    // ============================================================
    getPortfolioById: builder.query({
      query: (id) => `/portfolio/${id}`,
      // ✅ Transform response to return data directly
      transformResponse: (response) => {
        return {
          portfolio: response.data,
          success: response.success,
          message: response.message
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Portfolio not found',
          errors: response.data?.errors || []
        };
      },
      providesTags: (result, error, id) => [{ type: 'Portfolio', id }],
    }),

    // ============================================================
    // CREATE PORTFOLIO
    // ============================================================
    createPortfolio: builder.mutation({
      query: (formData) => ({
        url: '/portfolio',
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it for multipart/form-data
      }),
      transformResponse: (response) => {
        return {
          portfolio: response.data,
          success: response.success,
          message: response.message
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to create portfolio',
          errors: response.data?.errors || []
        };
      },
      invalidatesTags: [{ type: 'Portfolio', id: 'LIST' }],
    }),

    // ============================================================
    // UPDATE PORTFOLIO
    // ============================================================
    updatePortfolio: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/portfolio/${id}`,
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response) => {
        return {
          portfolio: response.data,
          success: response.success,
          message: response.message
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to update portfolio',
          errors: response.data?.errors || []
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Portfolio', id },
        { type: 'Portfolio', id: 'LIST' }
      ],
    }),

    // ============================================================
    // DELETE PORTFOLIO
    // ============================================================
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `/portfolio/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => {
        return {
          success: response.success,
          message: response.message
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to delete portfolio',
          errors: response.data?.errors || []
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Portfolio', id },
        { type: 'Portfolio', id: 'LIST' }
      ],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioByIdQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
