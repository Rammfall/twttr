// import { httpMethods, RouteParams } from 'types/RouteParams';
// import createUserHandler from 'controllers/user/create';
//
// const user: RouteParams[] = [
//   {
//     handler: createUserHandler,
//     schema: {
//       $id: 'validation/schemas/createUser.json',
//       type: 'object',
//       properties: {
//         body: {
//           type: 'object',
//           $ref: 'validation/schemas/main.json#/definitions/user',
//           required: ['username', 'email', 'password'],
//         },
//       },
//       required: ['body'],
//     },
//     method: httpMethods.POST,
//   },
// ];
//
// export default user;
