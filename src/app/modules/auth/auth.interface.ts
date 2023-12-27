/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./auth.constant";

export interface TRegister {
    _id: string;
    username: string;
    email: string;
    password: string;
    passwordChangedAt: Date; 
    role: 'user' | 'admin';
  }


export type TLogin = {
  username: string;
  password: string;
}


export interface UserModel extends Model<TRegister> {
  isUserExistByUsername(username: string): Promise<TRegister>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}



export type TUserRole = keyof typeof USER_ROLE;
