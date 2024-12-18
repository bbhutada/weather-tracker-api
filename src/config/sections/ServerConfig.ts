import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseConfigValidator } from '../BaseConfigValidator';

enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

enum NodeEnv {
  test = 'test',
  development = 'development',
  production = 'production',
}

export class ServerConfig extends BaseConfigValidator {
  @IsNumber()
  @IsNotEmpty()
  public port: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(LogLevel)
  public logLevel: LogLevel;

  @IsString()
  @IsNotEmpty()
  @IsEnum(NodeEnv)
  public nodeEnv: NodeEnv;

  @IsBoolean()
  @IsNotEmpty()
  public apiDocEnabled: boolean;

  constructor(config: NodeJS.ProcessEnv) {
    super();

    this.logLevel = config.LOG_LEVEL as LogLevel;
    this.nodeEnv = (config.NODE_ENV as NodeEnv) || NodeEnv.development;
    this.port = Number(config.SERVER_PORT) || 4000;
    this.apiDocEnabled = config.API_DOC_ENABLED === 'true';

    this.validate('ServerConfig');
  }
}
