import { IsBoolean, IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class CreateRainDataResponse {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @JSONSchema({
    description: 'UUID of the rain event.',
    example: '85b751da-03d6-40e1-bc73-7af0359bda76',
  })
  public id: string;

  @IsBoolean()
  @JSONSchema({
    description: 'Indicates whether it rained. True if it rained, false otherwise.',
    example: true,
  })
  public rain: boolean;

  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    description: 'User ID of the rain event.',
    example: 'some-user-id',
  })
  public userId: string;

  @IsDate()
  @JSONSchema({
    description: 'Timestamp of the rain event.',
    example: '2020-01-01T00:00:00.000Z',
  })
  public timestamp: Date;

  // @IsString()
  // @IsNotEmpty()
  // @JSONSchema({
  //   description: 'Location of the rain event.',
  //   example: 'Berlin',
  // })
  // public location: string;
}
