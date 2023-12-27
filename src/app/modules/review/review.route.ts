import express from 'express';
import { reviewControllers } from './review..controller';

const router = express.Router();

// Create a new review
router.post('/', reviewControllers.createReview);

export const reviewRoutes = router;