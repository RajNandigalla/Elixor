export const XSRF_COOKIE_NAME = new InjectionToken<string>('XSRF_COOKIE_NAME');
export const XSRF_HEADER_NAME = new InjectionToken<string>('XSRF_HEADER_NAME');

/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
export abstract class HttpXsrfTokenExtractor {
    /**
     * Get the XSRF token to use with an outgoing request.
     *
     * Will be called for every request, so the token may change between requests.
     */
    abstract getToken(): string | null;
}

/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
@Injectable()
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
    private lastCookieString: string = '';
    private lastToken: string | null = null;

    /**
     * @internal for testing
     */
    parseCount: number = 0;

    constructor(
        @Inject(DOCUMENT) private doc: any,
        @Inject(PLATFORM_ID) private platform: string,
        @Inject(XSRF_COOKIE_NAME) private cookieName: string
    ) { }

    getToken(): string | null {
        if (this.platform === 'server') {
            return null;
        }
        const cookieString = this.doc.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = parseCookieValue(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
}