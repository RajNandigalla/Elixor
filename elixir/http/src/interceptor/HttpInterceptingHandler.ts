import { Observable } from 'rxjs';
import { HttpHandler, HttpBackend } from '../backend';
import { HttpRequest } from '../request';
import { HttpEvent } from '../response';
import { HttpInterceptorHandler, HttpInterceptor } from './interceptor';
import { HTTP_INTERCEPTORS } from '../utils/tokens';
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
// @Injectable()
export class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler | null = null;
  private backend: HttpBackend;
  private injector: Injector;

  constructor(
    backend: HttpBackend,
    injector: Injector
  ) {
    this.backend = backend;
    this.injector = injector;
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = [];//this.injector.get(HTTP_INTERCEPTORS, []);
      this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }
}

/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * Use as a factory function within `HttpClientModule`.
 *
 *
 */
// export function interceptingHandler(backend: HttpBackend, interceptors: HttpInterceptor[] | null = []): HttpHandler {
//   if (!interceptors) {
//     return backend;
//   }
//   return interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), backend);
// }
