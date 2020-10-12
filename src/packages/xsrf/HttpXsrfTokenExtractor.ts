import { parseCookieValue } from './utils';
import { xsrfConfig } from './module';

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
            this.lastToken = parseCookieValue(cookieString, xsrfConfig.XSRFCookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
}
