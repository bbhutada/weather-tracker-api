import 'reflect-metadata';
import { ApiServer } from './server/ApiServer';
import { Database } from './Database';

(async () => {
  try {
    // start the server
    const apiServer = new ApiServer();
    await apiServer.start();

    // start the database
    const database = new Database();
    await database.start();

    const graceful = async () => {
      await apiServer.stop();
      await database.stop();
      process.exit(0);
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
  } catch (err) {
    console.error(`Error starting server:`, err);
    process.exit(1);
  }
})();
