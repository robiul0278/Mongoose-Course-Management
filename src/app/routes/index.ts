import { Router } from 'express';
import { courseRoutes } from '../modules/course/course.route';
import { categoryRoutes } from '../modules/category/category.route';
import { reviewRoutes } from '../modules/review/review.route';
import { userRoutes } from '../modules/auth/auth.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: courseRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/',
    route: userRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;