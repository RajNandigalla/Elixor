// tslint:disable
import { Observable, of } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';

import { HttpHandler } from './backend';
import { HttpHeaders } from './headers';
import { HttpParams, HttpParamsOptions } from './params';
import { HttpRequest } from './request';
import { HttpEvent, HttpResponse } from './response';


/**
 * Construct an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. Basically, this clones the object and adds the body.
 */
function addBody<T>(
  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  },
  body: T | null): any {
  return {
    body,
    headers: options.headers,
    observe: options.observe,
    params: options.params,
    reportProgress: options.reportProgress,
    responseType: options.responseType,
    withCredentials: options.withCredentials,
  };
}

export type HttpObserve = 'body' | 'events' | 'response';

/**
 * Perform HTTP requests.
 *
 * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies according to which
 * signature is called (mainly the values of `observe` and `responseType`).
 *
 * @publicApi
 */
// @Injectable()
export class HttpClient {
  constructor(private handler: HttpHandler) { }

  /**
   * Send the given `HttpRequest` and return a stream of `HttpEvents`.
   */
  public request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>;

  /**
   * Construct a request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Construct a request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    params?: HttpParams | { [param: string]: string | string[] },
    observe: 'events', reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a request which interprets the body as an `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    reportProgress?: boolean,
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<any>>;

  /**
   * Construct a request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `R`.
   */
  public request<R>(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    reportProgress?: boolean,
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<R>>;

  /**
   * Construct a request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    reportProgress?: boolean,
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    responseType?: 'json',
    withCredentials?: boolean,
    // tslint:disable-next-line:ban-types
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `R`.
   */
  public request<R>(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    reportProgress?: boolean,
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<R>>;

  /**
   * Construct a request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public request(method: string, url: string, options?: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    responseType?: 'json',
    reportProgress?: boolean,
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct a request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `R`.
   */
  public request<R>(method: string, url: string, options?: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    responseType?: 'json',
    reportProgress?: boolean,
    withCredentials?: boolean,
  }): Observable<R>;

  /**
   * Construct a request in a manner where response type and requested `Observable` are not known
   * statically.
   *
   * @return an `Observable` of whatever was requested, typed to `any`.
   */
  public request(method: string, url: string, options?: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    params?: HttpParams | { [param: string]: string | string[] },
    observe?: HttpObserve,
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any>;

  /**
   * Constructs an `Observable` for a particular HTTP request that, when subscribed,
   * fires the request through the chain of registered interceptors and on to the
   * server.
   *
   * This method can be called in one of two ways. Either an `HttpRequest`
   * instance can be passed directly as the only parameter, or a method can be
   * passed as the first parameter, a string URL as the second, and an
   * options hash as the third.
   *
   * If a `HttpRequest` object is passed directly, an `Observable` of the
   * raw `HttpEvent` stream will be returned.
   *
   * If a request is instead built by providing a URL, the options object
   * determines the return type of `request()`. In addition to configuring
   * request parameters such as the outgoing headers and/or the body, the options
   * hash specifies two key pieces of information about the request: the
   * `responseType` and what to `observe`.
   *
   * The `responseType` value determines how a successful response body will be
   * parsed. If `responseType` is the default `json`, a type interface for the
   * resulting object may be passed as a type parameter to `request()`.
   *
   * The `observe` value determines the return type of `request()`, based on what
   * the consumer is interested in observing. A value of `events` will return an
   * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
   * including progress events by default. A value of `response` will return an
   * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
   * depends on the `responseType` and any optionally provided type parameter.
   * A value of `body` will return an `Observable<T>` with the same `T` body type.
   */
  public request(first: string | HttpRequest<any>, url?: string, options: {
    body?: any,
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    let req: HttpRequest<any>;
    // Firstly, check whether the primary argument is an instance of `HttpRequest`.
    if (first instanceof HttpRequest) {
      // It is. The other arguments must be undefined (per the signatures) and can be
      // ignored.
      req = first as HttpRequest<any>;
    } else {
      // It's a string, so it represents a URL. Construct a request based on it,
      // and incorporate the remaining arguments (assuming GET unless a method is
      // provided.

      // Figure out the headers.
      let headers: HttpHeaders | undefined;
      if (options.headers instanceof HttpHeaders) {
        headers = options.headers;
      } else {
        headers = new HttpHeaders(options.headers);
      }

      // Sort out parameters.
      let params: HttpParams | undefined;
      if (!!options.params) {
        if (options.params instanceof HttpParams) {
          params = options.params;
        } else {
          params = new HttpParams({ fromObject: options.params } as HttpParamsOptions);
        }
      }

      // Construct the request.
      req = new HttpRequest(first, url!, (options.body !== undefined ? options.body : null), {
        headers,
        params,
        reportProgress: options.reportProgress,
        // By default, JSON is assumed to be returned for all calls.
        responseType: options.responseType || 'json',
        withCredentials: options.withCredentials,
      });
    }

    // Start with an Observable.of() the initial request, and run the handler (which
    // includes all interceptors) inside a concatMap(). This way, the handler runs
    // inside an Observable chain, which causes interceptors to be re-run on every
    // subscription (this also makes retries re-run the handler, including interceptors).
    const events$: Observable<HttpEvent<any>> =
      // tslint:disable-next-line:no-shadowed-variable
      of(req).pipe(concatMap((req: HttpRequest<any>) => {
        return this.handler.handle(req);
      }));

    // If coming via the API signature which accepts a previously constructed HttpRequest,
    // the only option is to get the event stream. Otherwise, return the event stream if
    // that is what was requested.
    if (first instanceof HttpRequest || options.observe === 'events') {
      return events$;
    }

    // The requested stream contains either the full response or the body. In either
    // case, the first step is to filter the event stream to extract a stream of
    // responses(s).
    const res$: Observable<HttpResponse<any>> = events$.pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse)) as Observable<HttpResponse<any>>;

    // Decide which stream to return.
    switch (options.observe || 'body') {
      case 'body':
        // The requested stream is the body. Map the response stream to the response
        // body. This could be done more simply, but a misbehaving interceptor might
        // transform the response body into a different format and ignore the requested
        // responseType. Guard against this by validating that the response is of the
        // requested type.
        switch (req.responseType) {
          case 'arraybuffer':
            return res$.pipe(map((res: HttpResponse<any>) => {
              // Validate that the body is an ArrayBuffer.
              if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                throw new Error('Response is not an ArrayBuffer.');
              }
              return res.body;
            }));
          case 'blob':
            return res$.pipe(map((res: HttpResponse<any>) => {
              // Validate that the body is a Blob.
              if (res.body !== null && !(res.body instanceof Blob)) {
                throw new Error('Response is not a Blob.');
              }
              return res.body;
            }));
          case 'text':
            return res$.pipe(map((res: HttpResponse<any>) => {
              // Validate that the body is a string.
              if (res.body !== null && typeof res.body !== 'string') {
                throw new Error('Response is not a string.');
              }
              return res.body;
            }));
          case 'json':
          default:
            // No validation needed for JSON responses, as they can be of any type.
            return res$.pipe(map((res: HttpResponse<any>) => res.body));
        }
      case 'response':
        // The response stream was requested directly, so return it.
        return res$;
      default:
        // Guard against new future observe types being added.
        throw new Error(`Unreachable: unhandled observe type ${options.observe}}`);
    }
  }

  /**
   * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;


  /**
   * Construct a DELETE request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a DELETE request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a DELETE request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a DELETE request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public delete<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a DELETE request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a DELETE request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public delete<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public delete(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public delete<T>(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * DELETE request to be executed on the server. See the individual overloads for
   * details of `delete()`'s return type based on the provided options.
   */
  public delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('DELETE', url, options as any);
  }


  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Construct a GET request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a GET request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a GET request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a GET request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a GET request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct a GET request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public get<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a GET request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a GET request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a GET request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a GET request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public get<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct a GET request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public get(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct a GET request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public get<T>(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * GET request to be executed on the server. See the individual overloads for
   * details of `get()`'s return type based on the provided options.
   */
  public get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('GET', url, options as any);
  }


  /**
   * Construct a HEAD request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,

    /**
   * Construct a HEAD request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  }): Observable<ArrayBuffer>;
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a HEAD request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a HEAD request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a HEAD request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a HEAD request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public head<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct a HEAD request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a HEAD request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a HEAD request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public head<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct a HEAD request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public head(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct a HEAD request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public head<T>(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * HEAD request to be executed on the server. See the individual overloads for
   * details of `head()`'s return type based on the provided options.
   */
  public head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('HEAD', url, options as any);
  }

  /**
   * Construct a JSONP request for the given URL and name of the callback parameter.
   *
   * @return an `Observable` of the response object as an `Object`
   */
  public jsonp(url: string, callbackParam: string): Observable<Object>;

  /**
   * Construct a JSONP request for the given URL and name of the callback parameter.
   *
   * @return an `Observable` of the response object as type `T`.
   */
  public jsonp<T>(url: string, callbackParam: string): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause a request
   * with the special method `JSONP` to be dispatched via the interceptor pipeline.
   *
   * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
   * If no such interceptor is reached, then the `JSONP` request will likely be
   * rejected by the configured backend.
   */
  public jsonp<T>(url: string, callbackParam: string): Observable<T> {
    return this.request<any>('JSONP', url, {
      params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
      observe: 'body',
      responseType: 'json',
    });
  }

  /**
   * Make an OPTIONS request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Construct an OPTIONS request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct an OPTIONS request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct an OPTIONS request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct an OPTIONS request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct an OPTIONS request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public options<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct an OPTIONS request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct an OPTIONS request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct an OPTIONS request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public options<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public options(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public options<T>(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * OPTIONS request to be executed on the server. See the individual overloads for
   * details of `options()`'s return type based on the provided options.
   */
  public options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('OPTIONS', url, options as any);
  }

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Construct a PATCH request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a PATCH request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a PATCH request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a PATCH request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public patch<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a PATCH request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a PATCH request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public patch<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct a PATCH request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public patch(url: string, body: any | null, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct a PATCH request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public patch<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * PATCH request to be executed on the server. See the individual overloads for
   * details of `patch()`'s return type based on the provided options.
   */
  public patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('PATCH', url, addBody(options, body));
  }

  /**
   * Construct a POST request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Construct a POST request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a POST request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a POST request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a POST request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a POST request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a POST request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct a POST request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public post<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct a POST request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a POST request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a POST request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a POST request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a POST request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public post<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public post(url: string, body: any | null, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public post<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * POST request to be executed on the server. See the individual overloads for
   * details of `post()`'s return type based on the provided options.
   */
  public post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('POST', url, addBody(options, body));
  }

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Construct a PUT request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Construct a PUT request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Construct a PUT request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Construct a PUT request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  public put<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'events', responseType?: 'json', withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Construct a PUT request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Construct a PUT request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  public put<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Construct a PUT request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  public put(url: string, body: any | null, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
    // tslint:disable-next-line:ban-types
  }): Observable<Object>;

  /**
   * Construct a PUT request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  public put<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * PUT request to be executed on the server. See the individual overloads for
   * details of `put()`'s return type based on the provided options.
   */
  public put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('PUT', url, addBody(options, body));
  }
}
