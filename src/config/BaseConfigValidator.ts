import { validateSync } from 'class-validator';

export class BaseConfigValidator {
  protected validate(sectionName: string) {
    const validationResult = validateSync(this);
    if (validationResult.length > 0) {
      throw new Error(`Invalid ${sectionName} config: ${validationResult.toString()}`);
    }
  }
}
