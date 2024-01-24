import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environment/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage['token']}`,
      'rs-uid': localStorage['uid'],
      'rs-email': localStorage['email'],
    });

    const cloned =
      request.url !== env.regUrl && request.url !== env.logUrl
        ? request.clone({ headers: httpHeaders })
        : request;

    return next.handle(cloned);
  }
}
