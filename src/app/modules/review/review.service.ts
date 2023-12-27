import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

// -------------------
// Create a new Review
// -------------------
const reviewDB = async (courseData: TReview) => {
  const result = await reviewModel.create(courseData);
  return result;
};



export const reviewServices = {
    reviewDB,
};