import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from './http';

export const localInterceptor = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(req)
        .pipe(tap((res: any) => {
            if (res instanceof HttpResponse) {
                console.warn('Response ::', res);
            }
        }, (err: any) => {
            console.warn('Error Response ::', err);
        }));
}


export const localInterceptor1 = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(req)
        .pipe(tap((res: any) => {
            if (res instanceof HttpResponse) {
                console.warn('Response1 ::', res);
            }
        }, (err: any) => {
            console.warn('Error Response ::', err);
        }));
}
