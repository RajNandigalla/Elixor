/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpRequest } from '../core/request';
import { HttpHandler } from '../core/backend';
import { HttpEvent, HttpResponse } from '../core/response';

/**
 *  @publicApi
 */
export const LoggingInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
  const started = Date.now();
  let ok: string;

  return next.handle(req)
    .pipe(tap(
      (event) => ok = event instanceof HttpResponse ? 'succeeded' : '',
      (error) => ok = 'failed',
    ), finalize(() => {
      const elapsed = Date.now() - started;
      const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
      console.warn(msg);
    }));
};
