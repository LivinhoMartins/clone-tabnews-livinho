import { InternalServerError, MethodNoAllowedError } from "infra/errors";

function onNomatchHandler(request, response) {
  const publicErrorObject = new MethodNoAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
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
