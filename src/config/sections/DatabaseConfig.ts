import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { BaseConfigValidator } from '../BaseConfigValidator';

export class DatabaseConfig extends BaseConfigValidator {
  @IsString()
  @IsNotEmpty()
  public host: string;

  @IsInt()
  @Min(4000)
  public port: number;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public user: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsBoolean()
  @IsNotEmpty()
  public debugOrmSql: boolean;

  constructor(config: NodeJS.ProcessEnv) {
    super();
    this.host = config.PG_HOST || 'localhost';
    this.port = Number(config.PG_PORT) || 5432;
    this.user = config.PG_USER || 'user';
    this.password = config.PG_PW || 'password';
    this.name = config.PG_DB || 'weather';
    this.debugOrmSql = config.DEBUG_ORM_SQL === 'true';

    this.validate('DbConfig');
  }
}
