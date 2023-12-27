import { TCategory } from "./category.interface";
import { categoryModel } from "./category.model";

// ---------------------
// Create a new Category
// ---------------------
const categoryDB = async (courseData: TCategory) => {
  const result = await categoryModel.create(courseData);
  return result;
};
// -------------------
// get All Categories
// -------------------
const getAllCategoryDB = async () => {
  const result = await categoryModel.find();
  return result;
};


export const categoryServices = {
    categoryDB,
    getAllCategoryDB,
};