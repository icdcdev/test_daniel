import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "./exceptions";

export async function validateDto<T extends object>(
  dtoClass: new () => T,
  plain: object
): Promise<T> {
  const dto = plainToInstance(dtoClass, plain);
  const errors = await validate(dto, { whitelist: true });

  if (errors.length > 0) {
    const messages = errors.map(err => Object.values(err.constraints ?? {})).flat();
    throw new BadRequestException(`Validation failed: ${messages.join(", ")}`);
  }

  return dto;
}
