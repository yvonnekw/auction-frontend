import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {KeycloakService} from '../keycloak/keycloak.service';

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
