import { Schema, SchemaObject } from 'ajv';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';

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

interface Query {
  [query: string]: string | string[];
}

interface Body<T = string> {
  [item: string]: T;
}

interface Cookie {
  key: string;
  value: string;
  time: Date;
  httpOnly: boolean;
  remove?: boolean;
}

export interface HandlerArguments<Body> {
  body: Body;
  params: ParamsObject;
  cookies: Cookie[];
  headers: ParamsObject;
  query: Query;
  payload: ParamsObject;
}

export interface HttpResult {
  status: httpStatusCodes;
  body?: unknown;
  cookies?: Cookie[];
  headers?: ParamsObject;
}

export type Handler = (
  handlerArgs: HandlerArguments<never>
) => Promise<HttpResult>;

export type Hook = (hookArguments: HandlerArguments<never>) => boolean;

export interface RouteParams {
  handler: Handler;
  schema: SomeJSONSchema;
  method: httpMethods;
  hooks?: Hook[];
}
