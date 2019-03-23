import { Observable } from 'rxjs';
import { HttpHandler } from '../core/backend';
import { HttpRequest } from '../core/request';
import { HttpEvent } from '../core/response';
import { JsonpClientBackend } from './jsonp';
import { jsonpCallbackContext, JsonpCallbackContext } from './JsonpCallbackContext';

/**
 * An `HttpInterceptor` which identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * @publicApi
 */
export const JsonpInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    if (req.method === 'JSONP') {
        return new JsonpClientBackend().handle(req as HttpRequest<never>);
    }
    // Fall through for normal HTTP requests.
    return next.handle(req);
};
