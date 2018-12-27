import { HttpInterceptor } from "../interceptor/interceptor";

export const XSRF_COOKIE_NAME = 'XSRF_COOKIE_NAME';
export const XSRF_HEADER_NAME = 'XSRF_HEADER_NAME';

/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 *
 * @publicApi
 */
export const HTTP_INTERCEPTORS = 'HTTP_INTERCEPTORS';
