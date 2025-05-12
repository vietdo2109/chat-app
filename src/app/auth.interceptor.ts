import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and add withCredentials so cookies are sent
    const authReq = req.clone({
      withCredentials: true,
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.endsWith('/auth/refresh')) {
          // Try refreshing the token
          return this.http
            .post('/api/auth/refresh', {}, { withCredentials: true })
            .pipe(
              switchMap(() => {
                // Retry the original request after successful refresh
                const retryReq = req.clone({ withCredentials: true });
                return next.handle(retryReq);
              }),
              catchError((refreshError) => {
                // If refresh fails, possibly redirect to login
                console.error('Token refresh failed:', refreshError);
                return throwError(() => refreshError);
              })
            );
        }

        return throwError(() => error);
      })
    );
  }
}
