import Ajv, { JSONSchemaType } from 'ajv';
import validationLength from 'constants/validations';

interface main {
  definitions: {
    username: string;
  };
}

const mainSchema: JSONSchemaType<main> = {
  $id: 'validation/',
  definitions: {
    username: {
      type: 'string',
      minLength: validationLength.user.username.minLength,
      maxLength: validationLength.user.username.maxLength,
    },
    email: {
      type: 'email',
    },
  },
};

export default mainSchema;
