import { Observable } from 'rxjs/internal/Observable';
import { config } from '../config';
import { HttpHandler } from '../core/backend';
import { HttpRequest } from '../core/request';
import { HttpEvent } from '../core/response';

/**
 *  @publicApi
 */
// eslint-disable-next-line max-len
const BaseURLInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
  if (!(req.url && new RegExp('^(http[s?://]+)').test(req.url))) {
    if (config.baseURL) {
      req = req.clone({ url: config.baseURL + req.url });
    }
  }
  return next.handle(req);
};

export default BaseURLInterceptor;
