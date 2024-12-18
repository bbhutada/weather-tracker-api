import { IsBoolean, IsDate } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { RainData } from '../../../entities/RainData';

export class GetRainDataResponse {
  @IsBoolean()
  @JSONSchema({
    description: 'Indicates whether it rained. True if it rained, false otherwise.',
    example: true,
  })
  public rain: boolean;

  @IsDate()
  @JSONSchema({
    description: 'Timestamp of the rain event.',
    example: '2020-01-01T00:00:00.000Z',
  })
  public timestamp: Date;

  public static fromData(data: RainData): GetRainDataResponse {
    const getRainDataResponse = new GetRainDataResponse();
    getRainDataResponse.rain = data.rain;
    getRainDataResponse.timestamp = data.timestamp;
    return getRainDataResponse;
  }
}
