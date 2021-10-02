import Ajv, { Schema, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import validator from 'validator';

import validationLength from 'constants/validations';

export const mainSchema: Schema = {
  $id: 'validation/schemas/main.json',
  type: 'object',
  definitions: {
    user: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          minLength: validationLength.user.username.minLength,
          maxLength: validationLength.user.username.maxLength,
        },
        email: {
          type: 'string',
          minLength: validationLength.user.email.minLength,
          maxLength: validationLength.user.email.maxLength,
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: validationLength.user.password.minLength,
          maxLength: validationLength.user.password.maxLength,
          format: 'password',
        },
      },
    },
  },
};

export const validate = (schema: Schema): ValidateFunction => {
  const ajv = new Ajv({ allErrors: true });
  const compiler = addFormats(ajv);

  compiler.addFormat('password', {
    type: 'string',
    validate: (password: string): boolean =>
      validator.isStrongPassword(password),
  });

  return compiler.addSchema(mainSchema).compile(schema);
};
