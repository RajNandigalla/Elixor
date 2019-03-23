export const XSRF_COOKIE_NAME = 'XSRF_COOKIE_NAME';
export const XSRF_HEADER_NAME = 'XSRF_HEADER_NAME';

export function parseCookieValue(cookieStr: string, name: string): string | null {
    name = encodeURIComponent(name);
    for (const cookie of cookieStr.split(';')) {
        const eqIndex = cookie.indexOf('=');
        const [cookieName, cookieValue]: string[] =
            eqIndex === -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
