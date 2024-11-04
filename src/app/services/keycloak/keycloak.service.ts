import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak: Keycloak;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9098',  // Keycloak base URL
      realm: 'auction-realm',   // Keycloak realm name
      clientId: 'auction-client' // Keycloak client ID
    });
  }

  // Initialize Keycloak instance
  init(): Promise<boolean> {
    return this.keycloak
      .init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
      })
      .then(authenticated => {
        return authenticated;
      })
      .catch(err => {
        console.error('Keycloak init error', err);
        return false;
      });
  }


  async getToken(): Promise<string | undefined> {
    try {
      await this.keycloak.updateToken(10)
      ;
      return this.keycloak.token;
    } catch {
      console.error('Failed to refresh token');
      return undefined;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  async login(): Promise<void> {
    return await this.keycloak?.login();
  }

  async logout(): Promise<void> {
    //return await this.keycloak.logout({redirectUri: window.location.origin});
    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }
  async register(): Promise<void> {
    return await this.keycloak?.register();
  }

  // Optionally, you can also expose a refreshToken method to handle token refresh if needed
  async refreshToken(): Promise<void> {
    try {
      const refreshed = await this.keycloak.updateToken(30) // Refresh token if it will expire in 30 seconds
      ;
      if (refreshed) {
        console.log('Token refreshed');
      } else {
        console.warn('Token not refreshed, still valid');
      }
    } catch {
      console.error('Failed to refresh token');
    }
  }
}

/*
using the above as I need to make sure I don't enforce login for other routes
such as public endpoints.
 */

/*
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;
  private _authenticated: boolean = false;
  private keycloakInstance: Keycloak.KeycloakInstance;

    constructor() {
      this.keycloakInstance = new Keycloak({
        url: 'http://localhost:9098',  // Keycloak base URL
        realm: 'auth2-auction-realm',  // Keycloak realm name
        clientId: 'auth2-auction-client' // Keycloak client ID
      });
    }


    get keycloak() {
      if (!this._keycloak) {
        this._keycloak = new Keycloak({
          url: 'http://localhost:9098',
          realm: 'auth2-auction-realm',
          clientId: 'auth2-auction-client'
        });
      }
      return this._keycloak;
    }

  get profile() : UserProfile | undefined {
    return this._profile
  }

  init(): Promise<boolean> {
    return this.keycloakInstance
      .init({
        onLoad: 'check-sso', // Don't force login; just check if logged in
        checkLoginIframe: false,
      })
      .then(authenticated => {
        this._authenticated = authenticated;
        return authenticated;
      })
      .catch(() => false);
  }

  isAuthenticated(): boolean {
    return this._authenticated || this.keycloakInstance.authenticated || false;
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({redirectUri: 'http:localhost;4200'})
  }
  */
  /*
  The following is suggested by ** but not working
   */
  /*
    login(): void {
    this.keycloakInstance.login();
  }

  logout(): void {
    this.keycloakInstance.logout();
  }

  getToken(): Promise<string> {
    return this.keycloakInstance.token ? Promise.resolve(this.keycloakInstance.token) : Promise.reject('No token');
  }
*/
/*
    async init() {
      console.log('Authenticating the user ...')
     const authenticated = await this.keycloak?.init({
       onLoad: 'login-required'
     });

      if (authenticated) {
        console.log('User Authenticated...');
        this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
        this._profile.token = this.keycloak?.token;
      }
    }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({redirectUri: 'http:localhost;4200'})
  }
  */

