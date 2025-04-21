import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Router} from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient} from '@angular/common/http';
import {KeycloakService} from './services/keycloak/keycloak.service';
import {HttpTokenInterceptor} from './services/interceptor/http-token.interceptor';


export function kcFactory(kcService:KeycloakService) {
  return () => kcService.init();
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    HttpClient,
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
    provideHttpClient()

  ],

};
