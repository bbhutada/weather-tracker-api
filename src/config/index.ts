import dotenv from 'dotenv';
import path from 'path';
import { DatabaseConfig } from './sections/DatabaseConfig';
import { ServerConfig } from './sections/ServerConfig';

// Load environment variables dynamically based on NODE_ENV
const envPath = path.join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`);
dotenv.config({ path: envPath });

export class AppConfig {
  public server: ServerConfig;
  public db: DatabaseConfig;

  constructor(envConfig: NodeJS.ProcessEnv) {
    this.server = new ServerConfig(envConfig);
    this.db = new DatabaseConfig(envConfig);
  }
}

export const config = new AppConfig(process.env);
