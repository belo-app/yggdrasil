import { Method } from "axios";

export enum HttpHeader {
  CONTENT_TYPE = "Content-Type",
}

export enum HttpMethodValues {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
}

export type HttpMethod = Method;
