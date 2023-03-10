import { Method } from "axios";
export declare enum HttpHeader {
    CONTENT_TYPE = "Content-Type"
}
export declare enum HttpMethodValues {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD"
}
export type HttpMethod = Method;
