import express from 'express';
import { categoryControllers } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import categoryValidationSchema from './category.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = express.Router();

// Create a new category
router.post('/', validateRequest(categoryValidationSchema), categoryControllers.createCategory);
router.get('/', auth(USER_ROLE.user), categoryControllers.getAllCategories);

export const categoryRoutes = router;