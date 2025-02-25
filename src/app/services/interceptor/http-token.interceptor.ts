

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {KeycloakService} from '../keycloak/keycloak.service';
import {from, Observable, switchMap} from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the token from KeycloakService, which returns a Promise
    return from(this.keycloakService.getToken()).pipe(
      switchMap(token => {
        if (token) {
          // Clone the request and attach the Authorization header with the token
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authReq);  // Send the request with the Authorization header
        }
        // If no token is present, continue with the original request
        return next.handle(request);
      })
    );
  }

}





/*
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip intercepting specific URLs
    if (request.url.includes('http://localhost:4200')) {
      return next.handle(request);
    }

    return from(this.keycloakService.getToken()).pipe(
      switchMap((token) =>
        from(this.keycloakService.getUsernameFromToken()).pipe(
          switchMap((username) => {
            const headers: { [key: string]: string } = {};

            // Add Authorization header if token is present
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }

            // Add X-Username header if username is present
            if (username) {
              headers['X-Username'] = username;
            }

            // Clone the request with additional headers
            const authReq = request.clone({
              setHeaders: headers,
            });

            return next.handle(authReq);
          })
        )
      )
    );
  }
}
*/
/*
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {KeycloakService} from '../keycloak/keycloak.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip intercepting specific URLs
    if (request.url.includes('/api/v1/products/get-all-products')) {
      return next.handle(request);
    }
    return from(this.keycloakService.getToken()).pipe(
      switchMap(token =>
        from(this.keycloakService.getToken()).pipe(
          switchMap(username => {
            const headers: { [key: string]: string } = {};

            // Add Authorization header if token is present
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }

            // Add X-Username header if username is present
            if (username) {
              headers['X-Username'] = username;
            }

            // Clone the request with additional headers
            const authReq = request.clone({
              setHeaders: headers,
            });

            return next.handle(authReq);
          })
        )
      )
    )
  }
}
*/
/*
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {KeycloakService} from '../keycloak/keycloak.service';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/api/v1/products/get-all-products')) {
      return next.handle(request);
    }

    return from(this.keycloakService.getToken()).pipe(
      switchMap(token => {
        if (token) {
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(authReq);
        }
        return next.handle(request);
      })
    );
  }
}



 */


