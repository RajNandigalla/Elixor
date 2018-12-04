/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpHeaders} from './../headers';
import { HttpHeaderResponse } from './HttpHeaderResponse';
import { HttpResponse } from './HttpResponse';

/**
 * Type enumeration for the different kinds of `HttpEvent`.
 *
 * @publicApi
 */
export enum HttpEventType {
  /**
   * The request was sent out over the wire.
   */
  Sent,

  /**
   * An upload progress event was received.
   */
  UploadProgress,

  /**
   * The response status code and headers were received.
   */
  ResponseHeader,

  /**
   * A download progress event was received.
   */
  DownloadProgress,

  /**
   * The full response including the body was received.
   */
  Response,

  /**
   * A custom event from an interceptor or a backend.
   */
  User,
}

/**
 * Base interface for progress events.
 *
 * @publicApi
 */
export interface HttpProgressEvent {
  /**
   * Progress event type is either upload or download.
   */
  type: HttpEventType.DownloadProgress|HttpEventType.UploadProgress;

  /**
   * Number of bytes uploaded or downloaded.
   */
  loaded: number;

  /**
   * Total number of bytes to upload or download. Depending on the request or
   * response, this may not be computable and thus may not be present.
   */
  total?: number;
}

/**
 * A download progress event.
 *
 * @publicApi
 */
export interface HttpDownloadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.DownloadProgress;

  /**
   * The partial response body as downloaded so far.
   *
   * Only present if the responseType was `text`.
   */
  partialText?: string;
}

/**
 * An upload progress event.
 *
 *
 */
export interface HttpUploadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.UploadProgress;
}

/**
 * An event indicating that the request was sent to the server. Useful
 * when a request may be retried multiple times, to distinguish between
 * retries on the final event stream.
 *
 * @publicApi
 */
export interface HttpSentEvent { type: HttpEventType.Sent; }

/**
 * A user-defined event.
 *
 * Grouping all custom events under this type ensures they will be handled
 * and forwarded by all implementations of interceptors.
 *
 * @publicApi
 */
export interface HttpUserEvent<T> { type: HttpEventType.User; }

/**
 * An error that represents a failed attempt to JSON.parse text coming back
 * from the server.
 *
 * It bundles the Error object with the actual response body that failed to parse.
 *
 *
 */
export interface HttpJsonParseError {
  error: Error;
  text: string;
}

/**
 * Union type for all possible events on the response stream.
 *
 * Typed according to the expected type of the response.
 *
 * @publicApi
 */
export type HttpEvent<T> =
    HttpSentEvent | HttpHeaderResponse | HttpResponse<T>| HttpProgressEvent | HttpUserEvent<T>;

/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * @publicApi
 */
export abstract class HttpResponseBase {
  /**
   * All response headers.
   */
  readonly headers: HttpHeaders;

  /**
   * Response status code.
   */
  readonly status: number;

  /**
   * Textual description of response status code.
   *
   * Do not depend on this.
   */
  readonly statusText: string;

  /**
   * URL of the resource retrieved, or null if not available.
   */
  readonly url: string|null;

  /**
   * Whether the status code falls in the 2xx range.
   */
  readonly ok: boolean;

  /**
   * Type of the response, narrowed to either the full response or the header.
   */
  // TODO(issue/24571): remove '!'.
  readonly type !: HttpEventType.Response | HttpEventType.ResponseHeader;

  /**
   * Super-constructor for all responses.
   *
   * The single parameter accepted is an initialization hash. Any properties
   * of the response passed there will override the default values.
   */
  constructor(
      init: {
        headers?: HttpHeaders,
        status?: number,
        statusText?: string,
        url?: string,
      },
      defaultStatus: number = 200, defaultStatusText: string = 'OK') {
    // If the hash has values passed, use them to initialize the response.
    // Otherwise use the default values.
    this.headers = init.headers || new HttpHeaders();
    this.status = init.status !== undefined ? init.status : defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;

    // Cache the ok value to avoid defining a getter.
    this.ok = this.status >= 200 && this.status < 300;
  }
}


