import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';
import { RainData } from './entities/RainData';

// Create DataSource options
const options: DataSourceOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: false, // Disable synchronize for production
  logging: config.db.debugOrmSql,
  entities: [RainData],
  subscribers: [],
  migrationsRun: true, // Run migrations
  migrations: [__dirname + '/migrations/**/*.ts'],
};

// Create and export the DataSource
export const AppDataSource = new DataSource(options);

export class Database {
  public start(): Promise<DataSource> {
    console.info('Connecting to database...');
    return AppDataSource.initialize();
  }

  public async runMigrations(): Promise<void> {
    console.info('Running migrations...');
    await AppDataSource.runMigrations();
  }

  public stop(): Promise<void> {
    console.info('Disconnecting the database...');
    return AppDataSource.destroy();
  }
}
