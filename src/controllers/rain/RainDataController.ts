import { Service } from 'typedi';
import {
  Body,
  Get,
  HeaderParam,
  HttpError,
  JsonController,
  NotFoundError,
  OnUndefined,
  Post,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { RainDataRepository } from '../../repositories/RainDataRepository';
import { GetRainDataResponse } from './response/GetRainDataResponse';
import { CreateRainData } from './request/CreateRainData';
import { CreateRainDataResponse } from './response/CreateRainDataResponse';

@JsonController('/data')
@Service()
export class RainDataController {
  constructor(private readonly rainDataRepository: RainDataRepository) {}

  @OpenAPI({
    description: 'Retrieve rain data entries for a specific user.',
    headers: {
      'x-userId': {
        description: 'User ID to filter the rain data entries.',
        required: true,
        type: 'string',
      },
    },
  })
  @ResponseSchema(GetRainDataResponse, { statusCode: 200 })
  @OnUndefined(404)
  @Get('/')
  async getRainData(@HeaderParam('x-userId') userId: string) {
    const rainData = await this.rainDataRepository.getDataByUserId(userId);

    if (!rainData?.length) {
      throw new NotFoundError('No rain data found for the provided user ID.');
    }

    return rainData.map(GetRainDataResponse.fromData);
  }

  @OpenAPI({
    description: 'Create a new rain data entry for a specific user.',
    headers: {
      'x-userId': {
        description: 'User ID to associate with the rain data entry.',
        required: true,
        type: 'string',
      },
    },
  })
  @ResponseSchema(CreateRainDataResponse, { statusCode: 201 })
  @Post('/')
  async createRainData(
    @Body() body: CreateRainData,
    @HeaderParam('x-userId') userId: string,
  ): Promise<CreateRainDataResponse> {
    if (!userId) {
      throw new HttpError(400, 'x-userId header is required.');
    }

    if (typeof body.rain !== 'boolean') {
      throw new HttpError(400, "'rain' field must be a boolean.");
    }

    const newRainData = await this.rainDataRepository.createData({
      rain: body.rain,
      userId,
    });

    return newRainData;
  }
}
