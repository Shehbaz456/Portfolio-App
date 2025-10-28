import express from 'express';
const router = express.Router();
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio
} from '../controllers/portfolio.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { portfolioValidator, portfolioUpdateValidator } from '../validators/portfolio.validator.js';

router.post('/',
    upload.fields([
        {
            name: 'profileImage',
            maxCount: 1,
        },
        {
            name: 'projectImage',
            maxCount: 3,
        },
    ]),
    portfolioValidator,
    createPortfolio
);
router.get('/', getAllPortfolios);
router.get('/:id', getPortfolioById);
router.put('/:id',
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'projectImage', maxCount: 3 }
    ]),
    portfolioUpdateValidator,
    updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;
