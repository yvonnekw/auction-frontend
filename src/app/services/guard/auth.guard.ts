import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {KeycloakService} from '../keycloak/keycloak.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      // Check if the user is authenticated using the Keycloak service
      const isAuthenticated = await this.keycloakService.isAuthenticated();
      if (isAuthenticated) {
        return true; // User is authenticated
      } else {
        // If not authenticated, redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication status', error);
      this.router.navigate(['/']); // Redirect to home in case of an error
      return false;
    }
  }
}

/*
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      // Check if the user is authenticated using the Keycloak service
      const isAuthenticated = await this.keycloakService.isAuthenticated();
      if (isAuthenticated) {
        return true; // User is authenticated
      } else {
        // If not authenticated, redirect to the home page or a login page
        this.router.navigate(['/login']); // Change to ['/login'] if you have a login route
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication status', error);
      // Handle error, optionally redirect to a specific error page
      this.router.navigate(['/']); // Or redirect to an error page
      return false;
    }
  }
}
*/
/*
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {TokenService} from '../token/token.service';
import {inject, Injectable} from '@angular/core';
import {KeycloakService} from '../keycloak/keycloak.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Check if the user is authenticated using the Keycloak service
    if (await this.keycloakService.isAuthenticated()) {
      return true;
    } else {
      // If not authenticated, redirect to the home page or a login page
      this.router.navigate(['/']);
      return false;
    }
  }
}
*/

/*
export const authGuard: CanActivateFn = () => {



  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  if (keycloakService.keycloak?.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;

};
*/
