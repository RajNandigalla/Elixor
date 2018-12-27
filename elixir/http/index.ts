/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// This file is not used to build this module. It is only used during editing
// by the TypeScript language service and during build for verification. `ngc`
// replaces this file with production index.ts when it rewrites private symbol
// names.

export { HttpBackend, HttpHandler } from './src/backend';
export { HttpClient } from './src/client';
export { HttpHeaders } from './src/headers';
export { HttpInterceptor } from './src/interceptor/interceptor';
export { JsonpClientBackend, JsonpInterceptor } from './src/jsonp';
export { HttpClientJsonpModule } from './src/module/HttpClientJsonpModule';
export { HttpClientModule } from './src/module/HttpClientModule';
export { HttpClientXsrfModule } from './src/module/HttpClientXsrfModule';
export { HttpParameterCodec, HttpParams, HttpUrlEncodingCodec } from './src/params';
export { HttpRequest } from './src/request';
export { HttpDownloadProgressEvent, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpResponseBase, HttpSentEvent, HttpUserEvent } from './src/response';
export { HttpXhrBackend, XhrFactory } from './src/xhr';
export { HttpXsrfTokenExtractor } from './src/xsrf';
export { HTTP_INTERCEPTORS } from './src/utils/tokens';
export { HttpInterceptingHandler as ɵHttpInterceptingHandler } from './src/interceptor/HttpInterceptingHandler';
