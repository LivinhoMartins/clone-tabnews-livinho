import {
  InternalServerError,
  MethodNoAllowedError,
  ValidationError,
  NotFoundError,
} from "infra/errors";

function onNomatchHandler(request, response) {
  const publicErrorObject = new MethodNoAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.error(publicErrorObject);

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNomatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
