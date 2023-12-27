/* eslint-disable @typescript-eslint/no-unused-vars */
import { reviewServices } from './review.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
// import sendResponse from '../../utils/sendResponse';


// -------------------
// Create a new Review
// -------------------
const createReview = catchAsync (async (req, res) => {
    const ReviewData = req.body;
    // const zodData = reviewValidationSchema.parse(ReviewData);

    const result = await reviewServices.reviewDB(ReviewData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully",
      data: result,
    });
  })


export const reviewControllers = {
    createReview,
};