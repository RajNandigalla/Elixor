import { Observable } from "rxjs";
import { HttpXsrfCookieExtractor } from "./getToken";
import { HttpInterceptor } from "../HttpModule/interceptor";
import { HttpRequest } from "../_Request/request";
import { HttpHandler } from "../_Handler/backend";
import { HttpEvent } from "../_Response/response";

// @Inject
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: HttpXsrfCookieExtractor,
    private headerName: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lcUrl = req.url.toLowerCase();
    if (
      req.method === "GET" ||
      req.method === "HEAD" ||
      lcUrl.startsWith("http://") ||
      lcUrl.startsWith("https://")
    )
      return next.handle(req);

    const token = this.tokenService.getToken();

    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({ headers: req.headers.set(this.headerName, token) });
    }
    return next.handle(req);
  }
}
