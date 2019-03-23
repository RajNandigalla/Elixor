import { HttpInterceptingHandler } from './core/module';
import { HttpInterceptor } from './core/interceptor';
import { HttpXhrBackend } from './http/xhr';
import { HttpClient } from './core/client';
import { HttpXsrfInterceptor } from './xsrf/HttpXsrfInterceptor';
import { JsonpInterceptor } from './jsonp/JsonpInterceptor';
import { XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './xsrf/utils';

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
        elixirConfig.baseURL = initial.baseURL;
        elixirConfig.XSRFCookieName = initial.XSRFCookieName;
        elixirConfig.XSRFHeaderName = initial.XSRFHeaderName;
        elixirConfig.interceptors.push(...initial.interceptors);
    }
}

const httpXhrBackend = new HttpXhrBackend();
const httpInterceptingHandler = new HttpInterceptingHandler(httpXhrBackend, elixirConfig.interceptors);
export const Elixir = new HttpClient(httpInterceptingHandler);
export * from './public_api';
