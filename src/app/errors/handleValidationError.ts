import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {

  const message: string[] = Object.values(err.errors).map(value => {
    const errorMessage = value.message
    return errorMessage;
  })
  

  const statusCode = 400;
  const joinMessage = message.join(' . ')
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: joinMessage,
  };
};

export default handleValidationError;