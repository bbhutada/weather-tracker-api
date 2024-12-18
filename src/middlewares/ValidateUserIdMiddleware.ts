import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'before' })
export class ValidateUserIdMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    const userId = req.headers['x-userid'];
    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ message: 'UserId header is required' });
      return;
    }
    next();
  }
}
