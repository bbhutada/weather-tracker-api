import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

/**
 * ErrorLogHandler: Logs all unexpected errors for monitoring.
 */
@Service()
@Middleware({ type: 'after', priority: 1 })
export class ErrorLoggerMiddleware implements ExpressErrorMiddlewareInterface {
  public error(error: Error, request: Request, response: Response, next: NextFunction) {
    console.error(`Unhandled error: ${error.message}`, { error, url: request.url, method: request.method });

    return next();
  }
}
