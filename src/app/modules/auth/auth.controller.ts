import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
// import config from "../../config";

const register = catchAsync(async (req, res) => {
  const result = await authServices.register(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    "message": "User registered successfully",
    data: result,
  });
})


const login = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      result,
    },
  });
});

const changePassword = catchAsync(async (req, res)=>{
  const decodedToken = req.user
  const result = await authServices.changePasswords(decodedToken, req.body)


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      result,
    },
  });
})

export const authControllers = {
    register,
    login,
    changePassword
}