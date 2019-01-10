import { Observable } from 'rxjs';
import { HttpHandler, HttpBackend } from '../backend';
import { HttpRequest } from '../request';
import { HttpEvent } from '../response';
import { HttpInterceptorHandler, HttpInterceptor } from './interceptor';

/**
 * An injectable `HttpHandler` that applies multiple interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * The interceptors are loaded lazily from the injector, to allow
 * interceptors to themselves inject classes depending indirectly
 * on `HttpInterceptingHandler` itself.
 * @see `HttpInterceptor`
 */
export class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler | null = null;
  private backend: HttpBackend;
  private interceptor: any;

  constructor(
    backend: HttpBackend,
    interceptor: HttpInterceptor[]
  ) {
    this.backend = backend;
    this.interceptor = interceptor;
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      this.chain = this.interceptor.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }
}
