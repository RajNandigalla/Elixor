import { HttpClient } from '../client';
import { BrowserXhr, HttpXhrBackend } from '../xhr';
import { HttpInterceptingHandler } from "../interceptor/HttpInterceptingHandler";
import { HttpModel } from './HttpModel';
import { HttpInterceptor } from '../interceptor/interceptor';

interface IElixirHttpClientModule {
    baseURL: string;
    interceptors: HttpInterceptor[];
    XSRFCookieName: string;
    XSRFHeaderName: string;
    EnableXSRF: boolean;
}

/**
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
        const inst = HttpModel.x();

        inst.$baseUrl(initial.baseURL);
        inst.$XSRFCookieName(initial.XSRFCookieName);
        inst.$XSRFHeaderName(initial.XSRFHeaderName);
        inst.$enableXSRF(initial.EnableXSRF);
        inst.$HttpInterceptors(initial.interceptors);
    }
}

const browseXhr = new BrowserXhr();
const httpXhrBackend = new HttpXhrBackend(browseXhr);
const httpInterceptingHandler = new HttpInterceptingHandler(httpXhrBackend, HttpModel.x().$HttpInterceptors);
export const Elixir = new HttpClient(httpInterceptingHandler);
