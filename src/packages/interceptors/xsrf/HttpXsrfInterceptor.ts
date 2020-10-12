import { Observable } from 'rxjs';
import { HttpHandler } from '../../core/backend';
import { HttpRequest } from '../../core/request';
import { HttpEvent } from '../../core/response';
import { xsrfConfig } from '../../xsrf/module';
import { HttpXsrfTokenExtractor } from '../../xsrf/HttpXsrfTokenExtractor';

/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
export const HttpXsrfInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    const lcUrl: string = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
        lcUrl.startsWith('https://')) {
        return next.handle(req);
    }
    const token = new HttpXsrfTokenExtractor().getToken();
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(xsrfConfig.XSRFHeaderName)) {
        req = req.clone({ headers: req.headers.set(xsrfConfig.XSRFHeaderName, token) });
    }
    return next.handle(req);
};


