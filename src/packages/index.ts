import { HttpInterceptingHandler } from './core/module';
import { HttpInterceptor } from './core/interceptor';
import { HttpXhrBackend } from './http/xhr';
import { HttpClient } from './core/client';
import { HttpXsrfInterceptor } from './xsrf/HttpXsrfInterceptor';
import { JsonpInterceptor } from './jsonp/JsonpInterceptor';
import { XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './xsrf/utils';
import { XSRFModule } from './xsrf/module';

export interface IelixorHttpClientModule {
    baseURL?: string;
    interceptors?: HttpInterceptor[];
    XSRFCookieName?: string;
    XSRFHeaderName?: string;
}

export let elixorConfig: IelixorHttpClientModule = {
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
        if (initial.baseURL !== null) { elixorConfig.baseURL = initial.baseURL; }
        if (initial.XSRFCookieName !== null) { elixorConfig.XSRFCookieName = initial.XSRFCookieName; }
        if (initial.XSRFCookieName !== null) { elixorConfig.XSRFHeaderName = initial.XSRFHeaderName; }
        if (initial.interceptors && initial.interceptors.length > 0) { elixorConfig.interceptors.push(...initial.interceptors); }

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
