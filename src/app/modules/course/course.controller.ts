/* eslint-disable @typescript-eslint/no-unused-vars */
import { courseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { TCourse } from './course.interface'

// -------------------
// Create a new Course
// -------------------
const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body
  // const zodData = courseValidationSchema.CreateValidationSchema.parse(courseData)
  const result = await courseServices.createCourseDB(courseData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  })
})
// ----------------------------------------------
// Function to get paginated and filtered courses
// ----------------------------------------------
const getAllCourses = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query

  const result: TCourse[] = await courseServices.getAllCoursesDB(query, +page, + limit)

  const totalCount = result.length;
  const metaData = {
    page: +page,
    limit: +limit,
    total: totalCount,
  };

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Courses retrieved successfully",
    meta: metaData,
    data: result,
  })
})
// -----------------------------
// Get Course by ID with Reviews
// -----------------------------
const getCourseWithReview = catchAsync(async (req, res) => {
  const id = req.params.id
  // const updateData = req.body;
  const result = await courseServices.getCourseWithReviewDB(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  })
})
// ---------------------------------------
// Update corse primitive op non-Primitive 
// ---------------------------------------
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await courseServices.updateCourseDB(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course update successfully',
    data: result,
  });
});
//---------------------------------------------
// Best Course Based on Average Review (Rating) 
//---------------------------------------------
const getBestCourse = catchAsync(async (req, res) => {

    const bestCourseData = await courseServices.getBestCourseDB();

    if (!bestCourseData) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'No courses found',
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Best course retrieved successfully',
      data: bestCourseData,
    });

});




export const courseControllers = {
  createCourse,
  getAllCourses,
  getCourseWithReview,
  updateCourse,
  getBestCourse,
}
