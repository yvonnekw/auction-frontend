import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartControllerService } from '../../services/cart/services/cart-controller.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCartItems$Params } from '../../services/cart/fn/cart-controller/get-cart-items';
import { CartItem } from '../../services/cart/models/cart-item';
import { RemoveItem$Params } from '../../services/cart/fn/cart-controller/remove-item';
import { CartService } from '../../services/shared/CartService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username?: string;
  userProfile: any;
  cartItemCount: number = 0;
  searchQuery: string = '';
  cartItems: any[] = [];
  subTotal: number = 0;
  loading: boolean = false;

  router = inject(Router);
  cartService = inject(CartService);
  keycloakService = inject(KeycloakService);
  cartControllerService = inject(CartControllerService)

  private cartSubscription!: Subscription;

  async ngOnInit(): Promise<void> {
    try {
      await this.checkLoginStatus();

      if (this.isLoggedIn && this.username) {
        this.loading = true; // Start loading state

        const token = await this.keycloakService.getToken();
        if (token) {
          this.fetchCartItems(token, this.username);
        }
      } else {
        this.loading = false; // Handle scenario where user is not logged in
      }
    } catch (error) {
      console.error("Error fetching cart or login status:", error);
      this.loading = false;
    }
  }

  async fetchCartItems(token: string, username: string) {
    try {
      const params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username
      };

      this.cartControllerService.getCartItems(params).subscribe(cart => {
        console.log("Cart response from API:", cart);
        const items = cart.items || [];
        console.log("Extracted cart items:", items);

        this.cartItems = items; // Directly update component variable
        this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);

        this.subTotal = items.reduce((sum, item) => sum + (item.price! * item.quantity! || 0), 0);

        this.loading = false;
      });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      this.loading = false;
    }
  }

  /*
    // Handle component initialization
    async ngOnInit(): Promise<void> {
      try {
        await this.checkLoginStatus();

        if (this.isLoggedIn && this.username) {
          this.loading = true; // Start loading state

          const token = await this.keycloakService.getToken();
          if (token) {
            await this.cartService.fetchCartItems(token, this.username);

            // Subscribe to cart items once they're fetched
            this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
              console.log("Cart items received in NavbarComponent:", items);
              this.cartItems = items;
              this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
              this.subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

              // After data is fetched, stop loading
              this.loading = false;
            });
          }
        } else {
          // Handle scenario where user is not logged in
          this.loading = false;
        }
      } catch (error) {
        console.error("Error fetching cart or login status:", error);
        this.loading = false; // Stop loading if there's an error
      }
    }
  */
  // Remove item from the cart
  async removeFromCart(itemId: number): Promise<void> {
    const token = await this.keycloakService.getToken();
    if (this.username) {
      await this.cartService.removeItemFromCart(itemId, token!, this.username);
    }
  }

  // Unsubscribe to prevent memory leaks
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Check login status and retrieve user details
  async checkLoginStatus(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isAuthenticated();
    if (this.isLoggedIn) {
      this.username = await this.keycloakService.getUsernameFromToken();
      this.userProfile = await this.keycloakService.getUserProfileData();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  register(): void {
    this.keycloakService.register();
  }

}

/*
import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartControllerService} from '../../services/cart/services/cart-controller.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {GetCartItems$Params} from '../../services/cart/fn/cart-controller/get-cart-items';
import {CartItem} from '../../services/cart/models/cart-item';
import {RemoveItem$Params} from '../../services/cart/fn/cart-controller/remove-item';
import {CartService} from '../../services/shared/CartService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  userProfile: any;
  cartItemCount: number = 0;
  searchQuery: string = '';
  cartItems: any[] = [];
  subTotal: number = 0;
  loading: boolean = false;
  router = inject(Router);
  cartService = inject(CartService);
  keycloakService = inject(KeycloakService);
  private cartSubscription!: Subscription;

  async ngOnInit(): Promise<void> {
    await this.checkLoginStatus();

    if (this.isLoggedIn && this.username) {
      const token = await this.keycloakService.getToken();

      if(token) {
        // Set loading to true when starting to fetch cart items
        this.loading = true;

        await this.cartService.fetchCartItems(token, this.username);

        // Subscribe to cartItems$
        this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
          this.cartItems = items;
          this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
          this.subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

          // Set loading to false once cart data is fetched
          this.loading = false;
        });
      }
    }
  }
/*
  async ngOnInit(): Promise<void> {
    await this.checkLoginStatus();

    if (this.isLoggedIn && this.username) {
      const token = await this.keycloakService.getToken();
      this.cartService.fetchCartItems(token!, this.username);

      // Subscribe to cartItems$
      this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
        this.subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);
      });
    }
  }
*/

/*
  async removeFromCart(itemId: number): Promise<void> {
    const token = await this.keycloakService.getToken();
    if (this.username) {
      this.cartService.removeItemFromCart(itemId, token!, this.username);
    }
  }

  // Unsubscribe when component is destroyed to prevent memory leaks
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Method to check login status
  async checkLoginStatus(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isAuthenticated();
    if (this.isLoggedIn) {
      this.username = await this.keycloakService.getUsernameFromToken();
      this.userProfile = await this.keycloakService.getUserProfileData();
    }
  }

*/
/*
  async ngOnInit(): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.warn("Token or username is missing. Cannot fetch cart items.");
        return;
      }

      this.cartService.fetchCartItems(token, username);

      // Subscribe to cart items and calculate subtotal
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
        this.subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0); // 🔹 Add subtotal calculation
      });

    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
*/
/*
  async checkLoginStatus(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isAuthenticated();
    if (this.isLoggedIn) {
      this.username = await this.keycloakService.getUsernameFromToken();
    }
  }
*/

/*
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  login(): void {
    this.keycloakService.login();
  }

  register(): void {
    this.keycloakService.register();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  redirectToCheckout() {
    this.router.navigateByUrl("/checkout");
  }
}

/*
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'], // Note: Fixed typo here (`styleUrl` -> `styleUrls`)
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  userProfile: any;
  cartItemCount: number = 0;
  subTotal: number = 0;

  cartItems: any[] = [];

  searchQuery: string = '';
  router = inject(Router);
  cartControllerService = inject(CartControllerService);


  constructor(private keycloakService: KeycloakService) {
  }

  async ngOnInit(): Promise<void> {
    await this.checkLoginStatus();
    try {
      const username = await this.keycloakService.getUsernameFromToken();
      const token = await this.keycloakService.getToken();

      if (!username) {
        console.error('Username not found in token.');
        return;
      }

      console.log('username:', username);
      console.log('token:', token);

      const params: GetCartItems$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
      };

      this.cartControllerService.getCartItems(params).pipe(
        map(cart =>
          (cart.items || []).reduce((count, item) => count + (item.quantity || 0), 0)
        )
      ).subscribe({
        next: (count) => {
          this.cartItemCount = count;
        },
        error: (err) => {
          console.error('Error fetching cart items:', err);
        }
      });

    } catch (error) {
      console.error('Error fetching token or username:', error);
    }
  }

  async removeFromCart(itemId: number): Promise<void> {

  }

  redirectToCheckout() {
    this.router.navigateByUrl("/checkout");
  }

*/
  /*
    async ngOnInit(): Promise<void> {
      await this.checkLoginStatus();
      try {
        const username = await this.keycloakService.getUsernameFromToken();
        const token = await this.keycloakService.getToken();

        if (!username) {
          console.error('Username not found in token.');
          return;
        }

        console.log('username:', username);
        console.log('token:', token);

        const params: GetCartItems$Params = {
          'Authorization': `Bearer ${token}`,
          'X-Username': username, // No need for `!` because we already checked it
        };

        this.cartControllerService.getCartItems(params).pipe(
          map(cart =>
            (cart.items || []).reduce((count, item) => count + (item.quantity || 0), 0)
          )
        ).subscribe({
          next: (count) => {
            this.cartItemCount = count;
          },
          error: (err) => {
            console.error('Error fetching cart items:', err);
          }
        });

      } catch (error) {
        console.error('Error fetching token or username:', error);
      }
    }

  */

  /*
  async checkLoginStatus(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isAuthenticated();
    if (this.isLoggedIn) {
      this.username = await this.keycloakService.getUsernameFromToken();
      this.userProfile = this.keycloakService.getUserProfileData();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Redirect to the search results page with query params
      this.router.navigate(['/search'], {queryParams: {query: this.searchQuery}});
    }
  }

  login(): void {
    this.keycloakService.login();
  }

  register(): void {
    this.keycloakService.register();
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
*/
/*
isLoggedIn = false;
username: string | undefined;

constructor(private keycloakService: KeycloakService) {}

ngOnInit() {
  this.checkLoginStatus();
}

async checkLoginStatus() {
  this.isLoggedIn = await this.keycloakService.isAuthenticated();
  if (this.isLoggedIn) {
    this.username = await this.keycloakService.getUsernameFromToken();
  }
}

login() {
  this.keycloakService.login();
}

register() {
  this.keycloakService.register();
}

logout() {
  this.keycloakService.logout();
}


 */
/*
isLoggedIn: boolean = false;
username: string | undefined;


constructor(private keycloakService: KeycloakService) {}

ngOnInit() {
  this.checkLoginStatus();
}

async checkLoginStatus() {
  this.isLoggedIn = await this.keycloakService.isAuthenticated();
  if (this.isLoggedIn) {
    this.username = this.keycloakService.getUsernameFromToken();
  }
}

async login() {
  await this.keycloakService.login();
  this.checkLoginStatus();
}

  async logout() {
  await this.keycloakService.logout();
  this.checkLoginStatus();
}

async register(): Promise<void> {
  await this.keycloakService!.register();
}
*/

