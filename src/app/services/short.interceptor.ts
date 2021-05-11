import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN = '147a2688ab79b0e7608b384b7cc30af8a1da9f13';
    request = request.clone({ setHeaders: { Authorization: 'Bearer ' + TOKEN} })
    return next.handle(request);
  }
}
