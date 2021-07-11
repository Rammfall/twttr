import {
  HandlerArguments,
  httpMethods,
  HttpResult,
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
    hooks: [],
    method: httpMethods.POST,
  },
];

export default user;
