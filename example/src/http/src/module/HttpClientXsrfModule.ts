import { HttpXsrfCookieExtractor, HttpXsrfTokenExtractor } from '../xsrf';
import { HttpXsrfInterceptor } from "../interceptor/HttpXsrfInterceptor";
import { Type } from '../utils/type';
import { HTTP_INTERCEPTORS, XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from '../utils/tokens';
import { Provider } from '../utils/provider';
import { HttpRequest, HttpHandler, HttpEvent } from 'src/http';
import { Observable } from 'rxjs';



// @Injectable()
export const intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(req);
}

/**
 * Configures XSRF protection support for outgoing requests.
 *
 * For a server that supports a cookie-based XSRF protection system,
 * use directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * If no names are supplied, the default cookie name is `XSRF-TOKEN`
 * and the default header name is `X-XSRF-TOKEN`.
 *
 * @publicApi
 */
export class HttpClientXsrfModule {


    public init = () => {
        providers: [
            HttpXsrfInterceptor,
            { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
            { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
            { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
            { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
        ]
    }

    /**
     * Disable the default XSRF protection.
     */
    static disable(): ModuleWithProviders<HttpClientXsrfModule> {
        return {
            ngModule: HttpClientXsrfModule,
            // providers: [
            //     { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
            // ],
        };
    }
    /**
     * Configure XSRF protection.
     * @param options An object that can specify either or both
     * cookie name or header name.
     * - Cookie name default is `XSRF-TOKEN`.
     * - Header name default is `X-XSRF-TOKEN`.
     *
     */
    static withOptions(options: {
        cookieName?: string;
        headerName?: string;
    } = {}): ModuleWithProviders<HttpClientXsrfModule> {
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
            ],
        };
    }
}


/**
 * A wrapper around an NgModule that associates it with the providers.
 *
 * @param T the module type. In Ivy applications, this must be explicitly
 * provided.
 *
 * @publicApi
 */
export interface ModuleWithProviders<
    T = any /** TODO(alxhub): remove default when callers pass explicit type param */> {
    ngModule: Type<T>;
    providers?: Provider[];
}