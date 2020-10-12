import { Observable } from 'rxjs/internal/Observable';
import { HttpRequest } from '../core/request';
import { HttpHandler } from '../core/backend';
import { HttpEvent } from '../core/response';
import { elixorConfig } from './../index';

/**
 *  @publicApi
 */
export const BaseURLInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    if (!(req.url && new RegExp('^(http[s?://]+)').test(req.url)))
        if (elixorConfig.baseURL)
            req = req.clone({ url: elixorConfig.baseURL + req.url });
    return next.handle(req);
};
