import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

enum ErrorTypes {
  UnauthorizedError = 'UnauthorizedError',
  ForbiddenError = 'ForbiddenError',
  NotFoundError = 'NotFoundError',
  BadRequestError = 'BadRequestError',
  InternalServerError = 'InternalServerError',
  EntityMetadataNotFound = 'EntityMetadataNotFound',
}

type CustomError = {
  type: ErrorTypes;
  statusCode: number;
  message: string;
};

const errorMappings: Record<ErrorTypes, CustomError> = {
  [ErrorTypes.UnauthorizedError]: {
    type: ErrorTypes.UnauthorizedError,
    statusCode: 401,
    message: 'User is not authorized.',
  },
  [ErrorTypes.ForbiddenError]: {
    type: ErrorTypes.ForbiddenError,
    statusCode: 403,
    message: 'Access to this resource is forbidden.',
  },
  [ErrorTypes.NotFoundError]: {
    type: ErrorTypes.NotFoundError,
    statusCode: 404,
    message: 'Resource not found.',
  },
  [ErrorTypes.BadRequestError]: {
    type: ErrorTypes.BadRequestError,
    statusCode: 400,
    message: 'Bad request. Please check your input.',
  },
  [ErrorTypes.InternalServerError]: {
    type: ErrorTypes.InternalServerError,
    statusCode: 500,
    message: 'An internal server error occurred. Please try again later.',
  },
  [ErrorTypes.EntityMetadataNotFound]: {
    type: ErrorTypes.EntityMetadataNotFound,
    statusCode: 500,
    message: 'Metadata for the requested resource not found.',
  },
};

@Service()
@Middleware({ type: 'after', priority: 99 })
export class ErrorResponseMiddleware implements ExpressErrorMiddlewareInterface {
  public error(error: { name: string; message: string }, request: Request, response: Response, next: NextFunction) {
    const mappedError = errorMappings[error.name as ErrorTypes];

    if (mappedError) {
      console.error(`Handled error: ${mappedError.message} - `, { error, url: request.url, method: request.method });
      return response.status(mappedError.statusCode).json({ message: mappedError.message });
    }

    return next(error); // Pass unexpected errors to the next middleware
  }
}
