import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import userValidationSchema from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

// Create a new category
router.post('/auth/register',validateRequest(userValidationSchema), authControllers.register);
router.post('/auth/login', authControllers.login );
router.post('/auth/change-password',auth(USER_ROLE.admin, USER_ROLE.user) , authControllers.changePassword );

export const userRoutes = router;