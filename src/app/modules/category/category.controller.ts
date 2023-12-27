/* eslint-disable @typescript-eslint/no-unused-vars */
import { categoryServices } from './category.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// Create category
const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.categoryDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req, res) => {
  // console.log('test', req.user)
  const result = await categoryServices.getAllCategoryDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'get all category successful!',
    data: result,
  })
})

export const categoryControllers = {
  createCategory,
  getAllCategories,
}
