import { HttpResponseBase } from "./response";
import { HttpHeaders } from "../headers";

/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * @publicApi
 */
export class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = "HttpErrorResponse";
  readonly message: string;
  readonly error: any | null;

  /**
   * Errors are never okay, even when the status code is in the 2xx success range.
   */
  readonly ok = false;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }) {
    // Initialize with a default status of 0 / Unknown Error.
    super(init, 0, "Unknown Error");

    // If the response was successful, then this was a parse error. Otherwise, it was
    // a protocol-level failure of some sort. Either the request failed in transit
    // or the server returned an unsuccessful status code.
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url ||
        "(unknown url)"}`;
    } else {
      this.message = `Http failure response for ${init.url ||
        "(unknown url)"}: ${init.status} ${init.statusText}`;
    }
    this.error = init.error || null;
  }
}
