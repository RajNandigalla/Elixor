import { HttpResponseBase, HttpEventType } from "./response";
import { HttpHeaders } from "../headers";

/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 * @publicApi
 */
export class HttpResponse<T> extends HttpResponseBase {
  /**
   * The response body, or `null` if one was not returned.
   */
  readonly body: T | null;

  /**
   * Construct a new `HttpResponse`.
   */
  constructor(
    init: {
      body?: T | null;
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ) {
    super(init);
    this.body = init.body !== undefined ? init.body : null;
  }

  readonly type: HttpEventType.Response = HttpEventType.Response;

  clone(): HttpResponse<T>;
  clone(update: {
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<T>;
  clone<V>(update: {
    body?: V | null;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<V>;
  clone(
    update: {
      body?: any | null;
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ): HttpResponse<any> {
    return new HttpResponse<any>({
      body: update.body !== undefined ? update.body : this.body,
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined
    });
  }
}
