import { parseCookieValue } from "./parseCookieValue";

// @Inject
export class HttpXsrfCookieExtractor {
  private lastCookieString: string = "";
  private lastToken: string | null = null;

  constructor(private doc: any, private cookieName: string) {}

  getToken(): string | null {
    const cookieString = this.doc.cookie || "";
    if (cookieString !== this.lastCookieString) {
      this.lastToken = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }
}

// export const XSRF_COOKIE_NAME = new InjectionToken<string>("XSRF_COOKIE_NAME");
// export const XSRF_HEADER_NAME = new InjectionToken<string>("XSRF_HEADER_NAME");
