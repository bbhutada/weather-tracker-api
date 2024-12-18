import { IsBoolean } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class CreateRainData {
  @IsBoolean()
  @JSONSchema({
    description: 'Indicates whether it rained.',
    example: true,
  })
  public rain?: boolean;
}
