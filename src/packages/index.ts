import { HttpInterceptingHandler } from './core/module';
import { HttpInterceptor } from './core/interceptor';
import { HttpXhrBackend } from './http/xhr';
import { HttpClient } from './core/client';
import { HttpXsrfInterceptor } from './xsrf/HttpXsrfInterceptor';
import { JsonpInterceptor } from './jsonp/JsonpInterceptor';
import { XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './xsrf/utils';
import { XSRFModule } from './xsrf/module';

export interface IElixirHttpClientModule {
    baseURL?: string;
    interceptors?: HttpInterceptor[];
    XSRFCookieName?: string;
    XSRFHeaderName?: string;
}

export let elixirConfig: IElixirHttpClientModule = {
    baseURL: '',
    interceptors: [
        HttpXsrfInterceptor,
        JsonpInterceptor,
    ],
    XSRFCookieName: XSRF_COOKIE_NAME,
    XSRFHeaderName: XSRF_HEADER_NAME,
};

export class ElixirHttpClientModule {

    public initialize = (initial: IElixirHttpClientModule) => {
        if (initial.baseURL !== null) { elixirConfig.baseURL = initial.baseURL; }
        if (initial.XSRFCookieName !== null) { elixirConfig.XSRFCookieName = initial.XSRFCookieName; }
        if (initial.XSRFCookieName !== null) { elixirConfig.XSRFHeaderName = initial.XSRFHeaderName; }
        if (initial.interceptors.length > 0) { elixirConfig.interceptors.push(...initial.interceptors); }

        const xsrf = {
            XSRFCookieName: elixirConfig.XSRFCookieName,
            XSRFHeaderName: elixirConfig.XSRFHeaderName,
        };

        XSRFModule.initialize(xsrf);
    }
}

const httpXhrBackend = new HttpXhrBackend();
const httpInterceptingHandler = new HttpInterceptingHandler(httpXhrBackend, elixirConfig.interceptors);
export const Elixir = new HttpClient(httpInterceptingHandler);
export * from './public_api';
