import { JsonpInterceptor } from './interceptors/jsonp/JsonpInterceptor';
import { HttpXsrfInterceptor } from './interceptors/xsrf/HttpXsrfInterceptor';
import { XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './xsrf/utils';
import { HttpInterceptor } from './interceptors/interceptor';

export interface IElixorHttpClientModule {
  baseURL?: string;
  interceptors?: HttpInterceptor[];
  XSRFCookieName?: string;
  XSRFHeaderName?: string;
}

export const config: IElixorHttpClientModule = {
  baseURL: '',
  interceptors: [
    HttpXsrfInterceptor,
    JsonpInterceptor,
  ],
  XSRFCookieName: XSRF_COOKIE_NAME,
  XSRFHeaderName: XSRF_HEADER_NAME,
};
