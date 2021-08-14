import { httpMethods, RouteParams } from 'types/RouteParams';
import createUser from 'controllers/user/create';

const user: RouteParams[] = [
  {
    // @ts-ignore
    handler: createUser,
    schema: {},
    method: httpMethods.POST,
  },
];

export default user;
