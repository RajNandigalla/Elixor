import { Observable } from 'rxjs';
import { HttpHandler } from '../core/backend';
import { HttpInterceptor } from '../core/interceptor';
import { HttpRequest } from '../core/request';
import { HttpEvent } from '../core/response';
import { parseCookieValue } from './utils';
import { elixirConfig } from '..';

/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
export const HttpXsrfInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    const lcUrl = req.url.toLowerCase();
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
    if (token !== null && !req.headers.has(elixirConfig.XSRFHeaderName)) {
        req = req.clone({ headers: req.headers.set(elixirConfig.XSRFHeaderName, token) });
    }
    return next.handle(req);
};

export class HttpXsrfTokenExtractor {

    /**
     * @internal for testing
     */
    public parseCount: number = 0;
    private lastCookieString: string = '';
    private lastToken: string | null = null;

    public getToken(): string | null {

        const cookieString = document.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = parseCookieValue(cookieString, elixirConfig.XSRFCookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
}
