import { FastifyInstance, RawRequestDefaultExpression } from 'fastify';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { RawServerBase } from 'fastify/types/utils';

export enum HttpMethods {
  'GET' = 'GET',
  'DELETE' = 'DELETE',
  'HEAD' = 'HEAD',
  'PATCH' = 'PATCH',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'OPTIONS' = 'OPTIONS',
}

export enum HttpStatusCodes {
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

export interface Cookie {
  action: CookieAction;
  name: string;
  value?: string;
  path: string;
}

export interface HttpResult {
  status: HttpStatusCodes;
  body?: unknown;
  headers?: RawRequestDefaultExpression['headers'];
  cookies?: Cookie[];
}

export type Context = FastifyInstance & {
  userId: number;
};

export type Handler = (
  this: Context,
  handlerArgs: {
    headers: RawRequestDefaultExpression['headers'];
    query: unknown;
    body: unknown;
    params: unknown;
    cookies: unknown;
    payload: {
      ip: string;
      routerPath: string;
      routerMethod: string;
      url: string;
      method: string;
    };
  }
) => Promise<HttpResult>;

export interface RouteParams {
  handler: Handler;
  schema: SomeJSONSchema;
  method: HttpMethods;
  config: {
    withAuth: boolean;
  };
}

export enum CookieAction {
  remove = 'clearCookie',
  add = 'setCookie',
}
