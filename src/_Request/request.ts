import { HttpHeaders } from '../../elixir/httpModule/headers';
import { HttpParams } from '../../elixir/httpModule/params';
import { mightHaveBody, isArrayBuffer, isBlob, isFormData } from './utils';

interface HttpRequestInit {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

export class HttpRequest<T> {

  readonly body: T | null = null;
  readonly headers !: HttpHeaders;
  readonly reportProgress: boolean = false;
  readonly withCredentials: boolean = false;
  readonly responseType: 'arraybuffer' | 'blob' | 'json' | 'text' = 'json';
  readonly method: string;
  readonly params !: HttpParams;
  readonly urlWithParams: string;

  constructor(method: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS', url: string, init?: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  });
  constructor(method: 'POST' | 'PUT' | 'PATCH', url: string, body: T | null, init?: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  });
  constructor(method: string, url: string, body: T | null, init?: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  });
  constructor(
    method: string, readonly url: string, third?: T | {
      headers?: HttpHeaders,
      reportProgress?: boolean,
      params?: HttpParams,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
      withCredentials?: boolean,
    } | null,
    fourth?: {
      headers?: HttpHeaders,
      reportProgress?: boolean,
      params?: HttpParams,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
      withCredentials?: boolean,
    }) {
    this.method = method.toUpperCase();
    // Next, need to figure out which argument holds the HttpRequestInit
    // options, if any.
    let options: HttpRequestInit | undefined;

    // Check whether a body argument is expected. The only valid way to omit
    // the body argument is to use a known no-body method like GET.
    if (mightHaveBody(this.method) || !!fourth) {
      // Body is the third argument, options are the fourth.
      this.body = (third !== undefined) ? third as T : null;
      options = fourth;
    } else {
      // No body required, options are the third argument. The body stays null.
      options = third as HttpRequestInit;
    }

    // If options have been passed, interpret them.
    if (options) {
      // Normalize reportProgress and withCredentials.
      this.reportProgress = !!options.reportProgress;
      this.withCredentials = !!options.withCredentials;

      // Override default response type of 'json' if one is provided.
      if (!!options.responseType) {
        this.responseType = options.responseType;
      }

      // Override headers if they're provided.
      if (!!options.headers) {
        this.headers = options.headers;
      }

      if (!!options.params) {
        this.params = options.params;
      }
    }

    // If no headers have been passed in, construct a new HttpHeaders instance.
    if (!this.headers) {
      this.headers = new HttpHeaders();
    }

    // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
    if (!this.params) {
      this.params = new HttpParams();
      this.urlWithParams = url;
    } else {
      // Encode the parameters to a string in preparation for inclusion in the URL.
      const params = this.params.toString();
      if (params.length === 0) {
        // No parameters, the visible URL is just the URL given at creation time.
        this.urlWithParams = url;
      } else {
        // Does the URL already have query parameters? Look for '?'.
        const qIdx = url.indexOf('?');
        // There are 3 cases to handle:
        // 1) No existing parameters -> append '?' followed by params.
        // 2) '?' exists and is followed by existing query string ->
        //    append '&' followed by params.
        // 3) '?' exists at the end of the url -> append params directly.
        // This basically amounts to determining the character, if any, with
        // which to join the URL and parameters.
        const sep: string = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
        this.urlWithParams = url + sep + params;
      }
    }
  }

  /**
   * Transform the free-form body into a serialized format suitable for
   * transmission to the server.
   */
  serializeBody(): ArrayBuffer | Blob | FormData | string | null {
    // If no body is present, no need to serialize it.
    if (this.body === null) {
      return null;
    }
    // Check whether the body is already in a serialized form. If so,
    // it can just be returned directly.
    if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
      typeof this.body === 'string') {
      return this.body;
    }
    // Check whether the body is an instance of HttpUrlEncodedParams.
    if (this.body instanceof HttpParams) {
      return this.body.toString();
    }
    // Check whether the body is an object or array, and serialize with JSON if so.
    if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
      Array.isArray(this.body)) {
      return JSON.stringify(this.body);
    }
    // Fall back on toString() for everything else.
    return (this.body as any).toString();
  }

 

  clone(): HttpRequest<T>;
  clone(update: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
    body?: T | null,
    method?: string,
    url?: string,
    setHeaders?: { [name: string]: string | string[] },
    setParams?: { [param: string]: string },
  }): HttpRequest<T>;
  clone<V>(update: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
    body?: V | null,
    method?: string,
    url?: string,
    setHeaders?: { [name: string]: string | string[] },
    setParams?: { [param: string]: string },
  }): HttpRequest<V>;
  clone(update: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
    body?: any | null,
    method?: string,
    url?: string,
    setHeaders?: { [name: string]: string | string[] },
    setParams?: { [param: string]: string };
  } = {}): HttpRequest<any> {
    // For method, url, and responseType, take the current value unless
    // it is overridden in the update hash.
    const method = update.method || this.method;
    const url = update.url || this.url;
    const responseType = update.responseType || this.responseType;

    // The body is somewhat special - a `null` value in update.body means
    // whatever current body is present is being overridden with an empty
    // body, whereas an `undefined` value in update.body implies no
    // override.
    const body = (update.body !== undefined) ? update.body : this.body;

    // Carefully handle the boolean options to differentiate between
    // `false` and `undefined` in the update args.
    const withCredentials =
      (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
    const reportProgress =
      (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;

    // Headers and params may be appended to if `setHeaders` or
    // `setParams` are used.
    let headers = update.headers || this.headers;
    let params = update.params || this.params;

    // Check whether the caller has asked to add headers.
    if (update.setHeaders !== undefined) {
      // Set every requested header.
      headers =
        Object.keys(update.setHeaders)
          .reduce((headers, name) => headers.set(name, update.setHeaders![name]), headers);
    }

    // Check whether the caller has asked to set params.
    if (update.setParams) {
      // Set every requested param.
      params = Object.keys(update.setParams)
        .reduce((params, param) => params.set(param, update.setParams![param]), params);
    }

    // Finally, construct the new HttpRequest using the pieces from above.
    return new HttpRequest(
      method, url, body, {
        params, headers, reportProgress, responseType, withCredentials,
      });
  }
}
