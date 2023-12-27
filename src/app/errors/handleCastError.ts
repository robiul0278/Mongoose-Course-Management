import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {

  const Message = err.value
  const errorMessage = `${Message} is not a valid Id`

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
  };
};

export default handleCastError;