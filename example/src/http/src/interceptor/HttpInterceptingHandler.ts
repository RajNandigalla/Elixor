import { Observable } from 'rxjs';
import { HttpHandler, HttpBackend } from '../backend';
import { HttpRequest } from '../request';
import { HttpEvent } from '../response';
import { HttpInterceptorHandler, InterceptHandler } from './interceptor';
import { Injector } from '../utils/injector';

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
  private injector: InterceptHandler[] = [];

  constructor(
    backend: HttpBackend,
    injector: InterceptHandler[]
  ) {
    this.backend = backend;
    this.injector = injector;
    console.log('times');
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector;//this.injector.get(HTTP_INTERCEPTORS, []);
      this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }
}
