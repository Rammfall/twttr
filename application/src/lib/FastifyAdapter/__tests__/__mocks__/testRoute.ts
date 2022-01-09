import {
  HandlerArguments,
  httpMethods,
  HttpResult,
  httpStatusCodes,
  RouteParams,
} from 'types/RouteParams';

const testRoute: RouteParams[] = [
  {
    schema: {
      $id: 'validation/schemas/refreshSession.json',
      type: 'object',
      properties: {
        body: {
          type: 'object',
          $ref: 'main.json#/definitions/user',
          required: ['username'],
        },
      },
      required: ['body'],
    },
    method: httpMethods.POST,
    handler: async ({
      body: { username },
    }: HandlerArguments<{ username: string }>): Promise<HttpResult> => {
      return {
        status: httpStatusCodes.Success,
        body: {
          username,
        },
      };
    },
  },
];
