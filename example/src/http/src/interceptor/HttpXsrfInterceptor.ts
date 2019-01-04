import { Observable } from 'rxjs';
import { HttpHandler } from '../backend';
import { HttpRequest } from '../request';
import { HttpEvent } from '../response';
import { HttpXsrfTokenExtractor } from '../xsrf';

/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
// @Injectable()
export class HttpXsrfInterceptor  { //implements HttpInterceptor
  private tokenService: HttpXsrfTokenExtractor;
  private headerName: string;
  // @Inject(XSRF_HEADER_NAME) private headerName: string;
  constructor(tokenService: HttpXsrfTokenExtractor, XSRF_HEADER_NAME: string) {
    this.tokenService = tokenService;
    this.headerName = XSRF_HEADER_NAME;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
      lcUrl.startsWith('https://')) {
      return next.handle(req);
    }
    const token = this.tokenService.getToken();
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({ headers: req.headers.set(this.headerName, token) });
    }
    return next.handle(req);
  }
}
