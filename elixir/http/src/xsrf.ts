/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// import { DOCUMENT } from '@angular/common';
// import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';


export function parseCookieValue(cookieStr: string, name: string): string | null {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(';')) {
    const eqIndex = cookie.indexOf('=');
    const [cookieName, cookieValue]: string[] =
      eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

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
// @Injectable()
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
  private lastCookieString: string = '';
  private lastToken: string | null = null;

  /**
   * @internal for testing
   */
  parseCount: number = 0;

  private cookieName: string;
  private platform: string

  constructor(
    PLATFORM_ID: string,
    XSRF_COOKIE_NAME: string
  ) {
    this.platform = PLATFORM_ID
    this.cookieName = XSRF_COOKIE_NAME;
  }

  getToken(): string | null {
    if (this.platform === 'server') {
      return null;
    }
    const cookieString = document.cookie || '';
    if (cookieString !== this.lastCookieString) {
      this.parseCount++;
      this.lastToken = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }
}


