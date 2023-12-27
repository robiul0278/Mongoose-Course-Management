import config from '../../config'
import { TLogin, TRegister } from './auth.interface'
import { AuthModel } from './auth.model'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const register = async (userData: TRegister) => {
  const result = await AuthModel.create(userData)

  return result
}

const login = async (payload: TLogin) => {
  //if the user exists

  const user = await AuthModel.isUserExistByUsername(payload.username)

  if (!user) {
    throw new Error('Invalid credentials')
  }

  if (!(await AuthModel.isPasswordMatched(payload?.password, user?.password)))
    throw new Error('Password do not matched!')

  // create access token
  const jwtPayload = {
    _id: user?._id,
    role: user?.role,
    email: user?.email,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })

  return {
    accessToken,
  }
}


//old password, new password
const changePassword = async (
  decodedToken: JwtPayload,
  payload: {
    currentPassword: string
    newPassword: string
  },
) => {
  const { email, iat } = decodedToken
  // console.log('USER',decodedToken)
  // console.log(iat, 'iat')

  const user = await AuthModel.findOne({ email }).select('+password')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  if (!iat) {
    throw new Error('Invalid token')
  }

  // console.log(user.passwordChangedAt, 'passwordChangedAt')
  //token issued before password changed
  //after the change of the change of the password, we should not allow the user to use the old token
  if (user.passwordChangedAt && iat < user.passwordChangedAt.getTime() / 1000) {
    throw new Error('Old token')
  }


  const isCorrectPassword = await AuthModel.isPasswordMatched(
    payload.currentPassword,
    user.password,
  )

  if (isCorrectPassword) {
    throw new Error('Invalid credentials boss')
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))

  const updatedUser = await AuthModel.findByIdAndUpdate(
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  )

  return updatedUser
}


const changePasswords = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await AuthModel.findOne(userData._id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (!(await AuthModel.isPasswordMatched(payload.currentPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await AuthModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};


export const authServices = {
  register,
  login,
  changePassword,
  changePasswords
}
