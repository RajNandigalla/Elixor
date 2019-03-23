import { Observable } from 'rxjs';
import { HttpHandler } from '../core/backend';
import { HttpRequest } from '../core/request';
import { HttpEvent } from '../core/response';

/**
 *  @publicApi
 */
export const NoopInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(req);
};
