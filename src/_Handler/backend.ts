import { Observable } from 'rxjs';
import { HttpEvent } from '../_Response/response';
import { HttpRequest } from '../_Request/request';

export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

export abstract class HttpBackend implements HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
