import { JsonpClientBackend } from "./jsonp";
import { HttpRequest } from "../request";
import { HttpHandler } from "../backend";
import { Observable } from "rxjs";
import { HttpEvent } from "../response";

/**
 * An `HttpInterceptor` which identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * @publicApi
 */
export class JsonpInterceptor {
  constructor(private jsonp: JsonpClientBackend) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'JSONP') {
      return this.jsonp.handle(req as HttpRequest<never>);
    }
    // Fall through for normal HTTP requests.
    return next.handle(req);
  }
}
