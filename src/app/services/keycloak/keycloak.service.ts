import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class KeycloakService {
  private keycloak: Keycloak;
  private jwtHelper = new JwtHelperService();
  private userProfile: any
  router = inject(Router)

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9098',
      realm: 'auction-realm',
      clientId: 'auction-frontend',
      //client_secret: 'password',

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
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      localStorage.setItem('username', decodedToken.preferred_username);
      return decodedToken.preferred_username;
    }
    return undefined;
  }

  /*
    async getUsernameFromToken(): Promise<string | undefined> {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.preferred_username!;
      }
      return undefined;
    }
  */
  getUserProfileData(): any {
    return this.userProfile;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  async login(): Promise<void> {
    try {
      await this.keycloak.login();
      await this.getToken();
    } catch (err) {
      console.error('Login failed', err);
    }
  }

  /*
    async login(): Promise<void> {
      return await this.keycloak?.login();
    }
  */
  async logout(): Promise<void> {
    await this.keycloak.logout({redirectUri: 'http://localhost:4200'});
    localStorage.clear();
    location.reload();
  }

  async register(): Promise<void> {
    return await this.keycloak?.register();
  }

  /*
    async getToken(requireLogin: boolean = true): Promise<string | undefined> {
      try {
        await this.keycloak.updateToken(10);
        const token = this.keycloak.token;
        if (token) {
          localStorage.setItem('access_token', token);
        }
        return token;
      } catch (err) {
        console.error('Failed to refresh token', err);
        if (requireLogin) {
          try {
            await this.keycloak.login();
          } catch (loginError) {
            console.error('Error during login redirect:', loginError);
          }
        }
        return undefined; // Allow token-less requests
      }
    }
  */
  /*
    async getToken(requireLogin: boolean = true): Promise<string | undefined> {
      try {
        await this.keycloak.updateToken(10);
        const token = this.keycloak.token;
        if (token) {
          localStorage.setItem('access_token', token);
        }
        return token;
      } catch (err) {
        console.error('Failed to refresh token', err);
        if (requireLogin) {
          try {
            await this.keycloak.login();
          } catch (loginError) {
            console.error('Error during login redirect:', loginError);
          }
        }
        return undefined; // Allow token-less access
      }
    }
  */
  /*
  async getToken(): Promise<string | undefined> {
    try {
      await this.keycloak.updateToken(10); // Attempt to refresh the token
      const token = this.keycloak.token;
      if (token) {
        localStorage.setItem('access_token', token); // Store the token locally
      }
      return token; // Return the token if available
    } catch (err) {
      console.error('Failed to refresh token', err);

      // Redirect the user to the login page if token refresh fails
      try {
        await this.keycloak.login();
      } catch (loginError) {
        console.error('Error during login redirect:', loginError);
      }
      return undefined; // Return undefined if token refresh/login fails
    }
  }
*/

  //async getToken(): Promise<string | undefined> {
  async getToken(requireLogin: boolean = true): Promise<string | undefined> {
    try {
      await this.keycloak.updateToken(10);
      const token = this.keycloak.token;
      if (token) {
        localStorage.setItem('access_token', token);
      }
      return token;
    } catch (err) {
      console.error('Failed to refresh token', err);

      return undefined;
      /*
      // Redirect user to the login page
      try {
        await this.keycloak.login();
      } catch (loginError) {
        console.error('Error during login redirect:', loginError);
      }
      return undefined;
    }*/
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const refreshed = await this.keycloak.updateToken(30);
      if (refreshed) {
        console.log('Token refreshed');
      } else {
        console.warn('Token not refreshed, still valid');
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      /*
            // Redirect user to the login page
            try {
              await this.keycloak.login();
            } catch (loginError) {
              console.error('Error during login redirect:', loginError);
            }
          }*/
    }
  }
}

/*
  async getToken(): Promise<string | undefined> {
    try {
      await this.keycloak.updateToken(10);
      return this.keycloak.token;
    } catch (err) {
      console.error('Failed to refresh token', err);
      return undefined;
    }
  }
*/
/*
async refreshToken(): Promise<void> {
  try {
    const refreshed = await this.keycloak.updateToken(30);
    if (refreshed) {
      console.log('Token refreshed');
    } else {
      console.warn('Token not refreshed, still valid');
    }
  } catch {
    console.error('Failed to refresh token');
    await this.keycloak.login();
  }
}
*/
//}


/*
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
      await this.keycloak.updateToken(10);
      return this.keycloak.token;
    } catch (err) {
      console.error('Failed to refresh token', err);
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
    await this.keycloak.logout({redirectUri: 'http://localhost:4200'});
    localStorage.clear();
    location.reload();
  }

  getUsernameFromToken(): string | undefined {
    const token = this.keycloak.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.preferred_username;
    }
    return undefined;
  }

  getEmailFromToken(): string | undefined {
    const token = this.keycloak.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.email;
    }
    return undefined;
  }

  async register(): Promise<void> {
    return await this.keycloak?.register();
  }

}

  /*
  // Initialize Keycloak instance
  init(): Promise<boolean> {
    return this.keycloak
      .init({
        onLoad: 'check-sso',
        //onLoad: 'login-required',
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
      await this.keycloak.updateToken(10);
      console.log('Retrieved Token:', this.keycloak.token);
      return this.keycloak.token;
    } catch (err) {
      console.error('Failed to refresh token', err);
      return undefined;
    }
  }


 */

/*
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


 */
/*
async isAuthenticated(): Promise<boolean> {
  const token = await this.getToken();
  return !!token;
}

async login(): Promise<void> {
  return await this.keycloak?.login();
}

async logout(): Promise<void> {
  //return await this.keycloak.logout({redirectUri: window.location.origin});
  await this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  localStorage.clear();
  location.reload();

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
getUsernameFromToken(): string | undefined {
  const token = localStorage.getItem('access_token'); // Assuming the token is saved in localStorage
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.preferred_username; // 'preferred_username' is part of the decoded JWT payload
  }
  return undefined; // Return undefined if no token is found
}
}*/
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

//}
