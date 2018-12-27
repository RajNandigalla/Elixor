import { HttpClient } from '../client';
import { BrowserXhr, HttpXhrBackend } from '../xhr';
import { HttpInterceptingHandler } from "../interceptor/HttpInterceptingHandler";
import { Injector } from '../utils/injector';
import { localInterceptor, localInterceptor1 } from 'src/localInterceptor';

/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 * @publicApi
 */
export class HttpClientModule {

    public init = (intercetors: any) => {
        // imports: [
        //     HttpClientXsrfModule.withOptions({
        //         cookieName: 'XSRF-TOKEN',
        //         headerName: 'X-XSRF-TOKEN',
        //     }),
        // ];
        /**
         * Configures the [dependency injector](guide/glossary#injector) where it is imported
         * with supporting services for HTTP communications.
         */


        new HttpClient(new HttpInterceptingHandler(new HttpXhrBackend(new BrowserXhr().build()), intercetors));

        // providers: [
        //     HttpClient,
        //     { provide: HttpHandler, useClass: HttpInterceptingHandler },
        //     HttpXhrBackend,
        //     { provide: HttpBackend, useExisting: HttpXhrBackend },
        //     BrowserXhr,
        //     { provide: XhrFactory, useExisting: BrowserXhr },
        // ];
    }
}

export const elixir = new HttpClient(new HttpInterceptingHandler(new HttpXhrBackend(new BrowserXhr()), [
    new localInterceptor(),
    new localInterceptor1()
  ]));
