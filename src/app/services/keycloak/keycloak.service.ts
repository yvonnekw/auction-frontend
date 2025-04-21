import { Injectable, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak: Keycloak.KeycloakInstance;
  private jwtHelper = new JwtHelperService();
  private userProfile: any;
  router = inject(Router);

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9098',
      realm: 'auction-realm',
      clientId: 'auction-frontend',
    });
  }

  init(): Promise<boolean> {
    return this.keycloak
      .init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (authenticated) {
          this.getUserProfile();
        }
        return authenticated;
      })
      .catch((err) => {
        console.error('Keycloak init error', err);
        return false;
      });
  }

  private async getUserProfile() {
    try {
      this.userProfile = await this.keycloak.loadUserInfo();
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  }

  async getUsernameFromToken(): Promise<string | undefined> {
    const token = this.keycloak.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.preferred_username;
    }
    return undefined;
  }

  getUserProfileData(): any {
    return this.userProfile;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = this.keycloak.token;
    return !!token;
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

  async loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    if (this.keycloak.authenticated) {
      return await this.keycloak.loadUserProfile();
    } else {
      throw new Error('User is not authenticated');
    }
  }

  async login(): Promise<void> {
    try {
      await this.keycloak.login();
      await this.getUserProfile();
    } catch (err) {
      console.error('Login failed', err);
    }
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
    localStorage.clear();
    location.reload();
  }

  async register(): Promise<void> {
    return await this.keycloak.register();
  }

  async getToken(): Promise<string | undefined> {
    if (this.keycloak.token) {
      await this.keycloak.updateToken(30);
      return this.keycloak.token;
    }
    return undefined;
  }

  getFirstName(): string | undefined {
    return this.userProfile ? this.userProfile.given_name : undefined;
  }

  getLastName(): string | undefined {
    return this.userProfile ? this.userProfile.family_name : undefined;
  }

  getEmail(): string | undefined {
    return this.userProfile ? this.userProfile.email : undefined;
  }
}

