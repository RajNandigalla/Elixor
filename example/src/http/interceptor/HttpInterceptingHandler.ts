import { Observable } from 'rxjs';
import { HttpBackend, HttpHandler } from '../backend';
import { HttpRequest } from '../request';
import { HttpEvent } from '../response';
import { HttpInterceptor, HttpInterceptorHandler } from './interceptor';
import { elixirConfig } from '../module/HttpClientModule';

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
  private interceptor: any = [];

  constructor(
    backend: HttpBackend,
    interceptor: HttpInterceptor[] | undefined
  ) {
    this.backend = backend;
    this.interceptor = interceptor;
    console.log(elixirConfig.interceptors);
  }

  public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      this.chain = this.interceptor.reduceRight((next: HttpHandler, interceptor: HttpInterceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain!.handle(req);
  }
}
