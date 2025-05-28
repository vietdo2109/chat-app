// auth.interceptor.ts
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private injector: Injector) {} // 🔁 instead of injecting AuthService directly

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // All requests should include cookies
    const clonedReq = req.clone({ withCredentials: true });
    const authService = this.injector.get(AuthService); // 🪄 lazily get AuthService

    return next.handle(clonedReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.isRefreshing
        ) {
          this.isRefreshing = true;
          return authService.refreshToken().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              return next.handle(clonedReq); // Retry the request
            }),
            catchError((err) => {
              this.isRefreshing = false;
              authService.onLogout(); // Optionally log user out
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
