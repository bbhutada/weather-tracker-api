import { createExpressServer, RoutingControllersOptions, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { config } from '../config';
import express from 'express';
import http from 'http';
import { RainDataController } from '../controllers/rain/RainDataController';
import { ErrorLoggerMiddleware } from '../middlewares/ErrorLoggerMiddleware';
import { ErrorResponseMiddleware } from '../middlewares/ErrorResponseMiddleware';
import { generateSpec } from './generateSpec';
import swaggerUi from 'swagger-ui-express';
import { ValidateUserIdMiddleware } from '../middlewares/ValidateUserIdMiddleware';

/**
 * ApiServer Class - Manages the setup, start, and stop of the Express API server.
 */
export class ApiServer {
  private readonly app: express.Application;
  private readonly apiOptions: RoutingControllersOptions;
  private server: http.Server | null = null;

  constructor() {
    // Configure routing controllers options
    this.apiOptions = {
      cors: true,
      routePrefix: '/api',
      classTransformer: true,
      defaultErrorHandler: false,
      controllers: [RainDataController],
      middlewares: [ValidateUserIdMiddleware, ErrorResponseMiddleware, ErrorLoggerMiddleware],
      validation: true,
    };

    // Use Typedi as the dependency injection container
    useContainer(Container);
    this.app = createExpressServer(this.apiOptions);

    // Serve OpenAPI documentation
    this.setupOpenApiDocumentation();
  }

  /**
   * Start the API server.
   * @returns {Promise<void>}
   */
  public async start(): Promise<void> {
    console.log('Starting the server...');

    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(config.server.port, () => {
        console.info(`Server is listening on port: ${config.server.port}`);

        if (config.server.nodeEnv === 'development') {
          console.info('Environment settings: ', JSON.stringify(config, null, 2));
        }

        resolve();
      });

      // Handle server errors
      this.server.on('error', (err) => {
        console.error(`Error occurred while starting the server: ${err.message}`);
        reject(err);
      });
    });
  }

  /**
   * Stop the API server.
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    if (!this.server) {
      console.warn('Server is not running or already stopped.');
      return Promise.resolve(true);
    }

    return new Promise<boolean>((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          console.error('Error during server shutdown:', err);
          return reject(false);
        }

        console.info('Server has stopped successfully.');
        resolve(true);
      });
    });
  }

  private setupOpenApiDocumentation() {
    if (!config.server.apiDocEnabled) {
      console.info(`API documentation disabled`);
      return;
    }

    const spec = generateSpec(this.apiOptions);

    this.app.get('/openapi', (_req, res) => {
      res.send(spec);
    });

    // Serve Swagger UI
    this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(spec));

    console.info(`API documentation enabled`);
    console.info(`Check API documentation: http://127.0.0.1:${config.server.port}/documentation`);
  }
}
