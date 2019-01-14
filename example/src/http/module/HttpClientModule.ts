import { HttpClient } from '../client';
import { HttpInterceptingHandler } from "../interceptor/HttpInterceptingHandler";
import { HttpInterceptor } from '../interceptor/interceptor';
import { BrowserXhr, HttpXhrBackend } from '../xhr';


interface IElixirHttpClientModule {
    baseURL?: string;
    interceptors?: HttpInterceptor[] | undefined;
    XSRFCookieName?: string;
    XSRFHeaderName?: string;
    EnableXSRF?: boolean;
}

export var elixirConfig: IElixirHttpClientModule = {
    baseURL: '',
    interceptors: [],
    XSRFCookieName: '',
    XSRFHeaderName: '',
    EnableXSRF: false
}

/*
 * 
 *  imports: [
            HttpClientXsrfModule.withOptions({
                cookieName: 'XSRF-TOKEN',
                headerName: 'X-XSRF-TOKEN',
            }),
        ];

        providers: [
            HttpClient,
            { provide: HttpHandler, useClass: HttpInterceptingHandler },
            HttpXhrBackend,
            { provide: HttpBackend, useExisting: HttpXhrBackend },
            BrowserXhr,
            { provide: XhrFactory, useExisting: BrowserXhr },
        ];
 */
export class ElixirHttpClientModule {

    public initialize = (initial: IElixirHttpClientModule) => {
        elixirConfig.baseURL = initial.baseURL;
        elixirConfig.interceptors = initial.interceptors;
        elixirConfig.XSRFCookieName = initial.XSRFCookieName;
        elixirConfig.XSRFHeaderName = initial.XSRFHeaderName;
        elixirConfig.EnableXSRF = initial.EnableXSRF;
    }
}

const browseXhr = new BrowserXhr();
const httpXhrBackend = new HttpXhrBackend(browseXhr);
const httpInterceptingHandler = new HttpInterceptingHandler(httpXhrBackend, elixirConfig.interceptors);
export const Elixir = new HttpClient(httpInterceptingHandler);
