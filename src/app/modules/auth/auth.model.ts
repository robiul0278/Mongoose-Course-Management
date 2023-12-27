import { Schema,model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'
import { TRegister, UserModel } from './auth.interface'

const userSchema = new Schema<TRegister, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

// Method to entered # password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.statics.isUserExistByUsername = async function (username) {
  return await AuthModel.findOne({ username }).select('+password')
}
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const AuthModel = model<TRegister, UserModel>('User', userSchema)
