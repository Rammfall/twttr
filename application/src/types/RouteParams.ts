import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { RawRequestDefaultExpression } from 'fastify';

export enum httpMethods {
  'GET' = 'GET',
  'DELETE' = 'DELETE',
  'HEAD' = 'HEAD',
  'PATCH' = 'PATCH',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'OPTIONS' = 'OPTIONS',
}

export enum httpStatusCodes {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  Success = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 209,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestURITooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  EnhanceYourCalm = 420,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  ReservedForWebDAV = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  NoResponse = 444,
  RetryWith = 449,
  BlockedByWindowsParentalControls = 450,
  UnavailableForLegalReasons = 451,
  ClientClosedRequest = 499,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  BandwidthLimitExceeded = 509,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
  NetworkReadTimeoutError = 598,
  NetworkConnectTimeoutError = 599,
}

interface ParamsObject {
  [param: string]: string;
}

export type Query = {
  [query: string]: string | string[];
};

interface DefaultShape {
  [key: string]: unknown;
}

export interface HandlerArguments<Body = DefaultShape, Cookies = DefaultShape> {
  body: Body;
  params: ParamsObject;
  cookies: Cookies;
  headers: ParamsObject;
  query: Query;
  payload: ParamsObject;
  actionsPayload: {
    [key: string]: unknown;
  };
}

export interface HttpResult {
  status: httpStatusCodes;
  body?: unknown;
  cookies?: Cookie;
  headers?: ParamsObject;
}

export type Handler = (handlerArgs: {
  headers: RawRequestDefaultExpression['headers'];
  payload: { ip: string };
  query: boolean;
  body: unknown;
  params: unknown;
  actionsPayload: { [p: string]: unknown };
  cookies: { [p: string]: string };
}) => Promise<HttpResult>;

export type Hook = (hookArguments: HandlerArguments<never>) => boolean;

export enum Actions {
  authCheck = 'authCheck',
}

export interface RouteParams {
  handler: Handler;
  schema: SomeJSONSchema;
  method: httpMethods;
  actions?: Actions[];
  hooks?: Hook[];
}

export enum CookieAction {
  remove = 'clearCookie',
  add = 'setCookie',
}

export interface Cookie {
  [param: string]:
    | {
        action: CookieAction.remove;
        path: string;
      }
    | {
        action: CookieAction.add;
        path: string;
        value: string;
      };
}
