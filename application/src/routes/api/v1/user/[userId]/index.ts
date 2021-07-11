import {
  HandlerArguments,
  httpMethods,
  httpStatusCodes,
  RouteParams,
} from 'types/RouteParams';
import UserAccount from 'db/entity/UserAccount';

const user: RouteParams[] = [
  {
    handler: async ({ params }: HandlerArguments) => {
      const id = +params.userId;
      const user = await UserAccount.find({ id });

      return {
        body: {
          data: user,
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
