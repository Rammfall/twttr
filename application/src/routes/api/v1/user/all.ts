import {
  HandlerArguments,
  httpMethods,
  httpStatusCodes,
  RouteParams,
} from 'types/RouteParams';
import UserAccount from '../../../../db/entity/UserAccount';

const user: RouteParams[] = [
  {
    handler: async ({ body }: HandlerArguments) => {
      const users = await UserAccount.find();

      return {
        body: {
          data: users,
        },
        status: httpStatusCodes.Success,
      };
    },
    schema: {},
    hooks: [
      ({ body }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return body.check === 'test';
      },
    ],
    method: httpMethods.POST,
  },
];

export default user;
