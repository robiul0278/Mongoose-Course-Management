import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidationSchema } from './course.validation';


const router = express.Router();


router.post('/course', validateRequest(courseValidationSchema.CreateValidationSchema),  courseControllers.createCourse);

router.get('/courses', courseControllers.getAllCourses);

router.get('/courses/:id/reviews', courseControllers.getCourseWithReview);

router.get('/course/best', courseControllers.getBestCourse);

router.put('/courses/:id', validateRequest(courseValidationSchema.UpdateValidationSchema), courseControllers.updateCourse);


export const courseRoutes = router;