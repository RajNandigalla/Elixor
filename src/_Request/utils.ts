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
