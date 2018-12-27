export function mightHaveBody(method: string): boolean {
  switch (method) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return false;
    default:
      return true;
  }
}

export function isArrayBuffer(value: any): value is ArrayBuffer {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
}

export function isBlob(value: any): value is Blob {
  return typeof Blob !== "undefined" && value instanceof Blob;
}

export function isFormData(value: any): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

/**
* Examine the body and attempt to infer an appropriate MIME type
* for it.
*
* If no such type can be inferred, this method will return `null`.
*/
export function detectContentTypeHeader(): string | null {
  // An empty body has no content type.
  if (this.body === null) {
    return null;
  }
  // FormData bodies rely on the browser's content type assignment.
  if (isFormData(this.body)) {
    return null;
  }
  // Blobs usually have their own content type. If it doesn't, then
  // no type can be inferred.
  if (isBlob(this.body)) {
    return this.body.type || null;
  }
  // Array buffers have unknown contents and thus no type can be inferred.
  if (isArrayBuffer(this.body)) {
    return null;
  }
  // Technically, strings could be a form of JSON data, but it's safe enough
  // to assume they're plain strings.
  if (typeof this.body === "string") {
    return "text/plain";
  }
  // `HttpUrlEncodedParams` has its own content-type.
  if (this.body instanceof HttpParams) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  // Arrays, objects, and numbers will be encoded as JSON.
  if (
    typeof this.body === "object" ||
    typeof this.body === "number" ||
    Array.isArray(this.body)
  ) {
    return "application/json";
  }
  // No type could be inferred.
  return null;
}
