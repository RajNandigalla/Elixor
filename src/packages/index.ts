import { HttpClient } from './core/client';
import { HttpXhrBackend } from './http/xhr';
import { HttpInterceptingHandler } from './interceptors';
import { BaseURLInterceptor } from './interceptors/BaseURLInterceptor';
import { HttpInterceptor } from './interceptors/interceptor';
import { JsonpInterceptor } from './interceptors/jsonp/JsonpInterceptor';
import { HttpXsrfInterceptor } from './interceptors/xsrf/HttpXsrfInterceptor';
import { XSRFModule } from './xsrf/module';
import { XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './xsrf/utils';

export interface IelixorHttpClientModule {
    baseURL?: string;
    interceptors?: HttpInterceptor[];
    XSRFCookieName?: string;
    XSRFHeaderName?: string;
}

export const elixorConfig: IelixorHttpClientModule = {
  baseURL: '',
  interceptors: [
    HttpXsrfInterceptor,
    JsonpInterceptor,
  ],
  XSRFCookieName: XSRF_COOKIE_NAME,
  XSRFHeaderName: XSRF_HEADER_NAME,
};

export class ElixorModule {
    public static initialize = (initial: IelixorHttpClientModule) => {
      if (initial.XSRFCookieName) { elixorConfig.XSRFCookieName = initial.XSRFCookieName; }
      if (initial.XSRFCookieName) { elixorConfig.XSRFHeaderName = initial.XSRFHeaderName; }
      if (initial.baseURL) {
        elixorConfig.baseURL = initial.baseURL;
        elixorConfig.interceptors.push(BaseURLInterceptor);
      }
      if (initial.interceptors && initial.interceptors.length > 0) {
        elixorConfig.interceptors.push(...initial.interceptors);
      }

      const xsrf = {
        XSRFCookieName: elixorConfig.XSRFCookieName,
        XSRFHeaderName: elixorConfig.XSRFHeaderName,
      };

      XSRFModule.initialize(xsrf);
    }
}

const httpXhrBackend = new HttpXhrBackend();
const httpInterceptingHandler = new HttpInterceptingHandler(httpXhrBackend, elixorConfig.interceptors);
export const elixor = new HttpClient(httpInterceptingHandler);
export * from './public_api';
