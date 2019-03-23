
import { Observable } from 'rxjs/internal/Observable';
import { HttpRequest } from '../core/request';
import { HttpHandler } from '../core/backend';
import { HttpEvent } from '../core/response';

/**
 *  @publicApi
 */
export const BaseURLInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(req);
};
