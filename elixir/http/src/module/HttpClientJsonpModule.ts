import { JsonpCallbackContext, JsonpClientBackend, JsonpInterceptor } from '../jsonp';
import { HTTP_INTERCEPTORS } from '../utils/tokens';


/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 */
export function jsonpCallbackContext(): Object {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}

/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for JSONP.
 * Without this module, Jsonp requests reach the backend
 * with method JSONP, where they are rejected.
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 * @publicApi
 */
export class HttpClientJsonpModule {

    public init = () => {
        providers: [
            JsonpClientBackend,
            { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
            { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
        ];
    }
}
