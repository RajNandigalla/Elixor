import { config, IElixorHttpClientModule } from './config';
import { HttpClient } from './core/client';
import { HttpXhrBackend } from './http/xhr';
import { HttpInterceptingHandler } from './interceptors';
import BaseURLInterceptor from './interceptors/BaseURLInterceptor';
import { XSRFModule } from './xsrf/module';

export class ElixorModule {
  public static initialize = (initial: IElixorHttpClientModule) => {
    if (initial.XSRFCookieName) { config.XSRFCookieName = initial.XSRFCookieName; }
    if (initial.XSRFCookieName) { config.XSRFHeaderName = initial.XSRFHeaderName; }
    if (initial.baseURL) {
      config.baseURL = initial.baseURL;
      config.interceptors.push(BaseURLInterceptor);
    }
    if (initial.interceptors && initial.interceptors.length > 0) {
      config.interceptors.push(...initial.interceptors);
    }

    const xsrf = {
      XSRFCookieName: config.XSRFCookieName,
      XSRFHeaderName: config.XSRFHeaderName,
    };

    XSRFModule.initialize(xsrf);
  }
}

const httpXhrBackend = new HttpXhrBackend();
const httpInterceptingHandler = new HttpInterceptingHandler(httpXhrBackend, config.interceptors);
export const elixor = new HttpClient(httpInterceptingHandler);
export * from './public_api';
