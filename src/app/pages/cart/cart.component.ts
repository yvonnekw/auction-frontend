import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartControllerService } from '../../services/cart/services/cart-controller.service';
import { GetCartItems$Params } from '../../services/cart/fn/cart-controller/get-cart-items';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { AddItemToCart$Params } from '../../services/cart/fn/cart-controller/add-item-to-cart';
import { ClearCart$Params } from '../../services/cart/fn/cart-controller/clear-cart';
import { RemoveItem$Params } from '../../services/cart/fn/cart-controller/remove-item';
import { UpdateCart$Params } from '../../services/cart/fn/cart-controller/update-cart';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  username: string = '';
  token: string = '';

  constructor(
    private cartControllerService: CartControllerService,
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  async loadCartItems(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: GetCartItems$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username
    };

    this.cartControllerService.getCartItems(params).subscribe(
      (data) => {
        this.cartItems = data.items || [];
        this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  async addItemToCart(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: AddItemToCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.addItemToCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  async clearCart(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: ClearCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
    };

    this.cartControllerService.clearCart(params).subscribe(
      () => {
        this.cartItems = [];
        this.totalAmount = 0;
      },
      (error) => {
        console.error('Error clearing cart', error);
      }
    );
  }

  async removeItem(itemId: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: RemoveItem$Params = {
      'itemId': itemId
    };

    this.cartControllerService.removeItem(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error removing item from cart', error);
      }
    );
  }

  async updateCartItem(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: UpdateCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.updateCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating cart item', error);
      }
    );
  }

  checkout(): void {
    this.router.navigate(['/checkout'], { state: { cartItems: this.cartItems, totalAmount: this.totalAmount } });
  }
}
/*
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartControllerService } from '../../services/cart/services/cart-controller.service';
import { GetCartItems$Params } from '../../services/cart/fn/cart-controller/get-cart-items';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { AddItemToCart$Params } from '../../services/cart/fn/cart-controller/add-item-to-cart';
import { ClearCart$Params } from '../../services/cart/fn/cart-controller/clear-cart';
import { RemoveItem$Params } from '../../services/cart/fn/cart-controller/remove-item';
import { UpdateCart$Params } from '../../services/cart/fn/cart-controller/update-cart';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  username: string = '';
  token: string = '';

  constructor(
    private cartControllerService: CartControllerService,
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  async loadCartItems(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: GetCartItems$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username
    };

    this.cartControllerService.getCartItems(params).subscribe(
      (data) => {
        this.cartItems = data.items || [];
        this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  async addItemToCart(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: AddItemToCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.addItemToCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  async clearCart(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: ClearCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
    };

    this.cartControllerService.clearCart(params).subscribe(
      () => {
        this.cartItems = [];
        this.totalAmount = 0;
      },
      (error) => {
        console.error('Error clearing cart', error);
      }
    );
  }

  async removeItem(itemId: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: RemoveItem$Params = {
      'itemId': itemId
    };

    this.cartControllerService.removeItem(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error removing item from cart', error);
      }
    );
  }

  async updateCartItem(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: UpdateCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.updateCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating cart item', error);
      }
    );
  }

  checkout(): void {
    this.router.navigate(['/checkout'], { state: { cartItems: this.cartItems, totalAmount: this.totalAmount } });
  }
}
*/
/*

import { Component, OnInit } from '@angular/core';
import { CartControllerService } from '../../services/cart/services/cart-controller.service';
import { GetCartItems$Params } from '../../services/cart/fn/cart-controller/get-cart-items';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { AddItemToCart$Params } from '../../services/cart/fn/cart-controller/add-item-to-cart';
import { ClearCart$Params } from '../../services/cart/fn/cart-controller/clear-cart';
import { RemoveItem$Params } from '../../services/cart/fn/cart-controller/remove-item';
import { UpdateCart$Params } from '../../services/cart/fn/cart-controller/update-cart';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule, NgFor, NgIf} from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],

})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  username: string = '';
  token: string = '';

  constructor(private cartControllerService: CartControllerService, private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  async loadCartItems(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: GetCartItems$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username
    };

    this.cartControllerService.getCartItems(params).subscribe(
      (data) => {
        this.cartItems = data.items || [];
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  async addItemToCart(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: AddItemToCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.addItemToCart(params).subscribe(
      (data) => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  async clearCart(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: ClearCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
    };

    this.cartControllerService.clearCart(params).subscribe(
      () => {
        this.cartItems = [];
      },
      (error) => {
        console.error('Error clearing cart', error);
      }
    );
  }

  async removeItem(itemId: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: RemoveItem$Params = {
      'itemId': itemId
    };

    this.cartControllerService.removeItem(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error removing item from cart', error);
      }
    );
  }

  async updateCartItem(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: UpdateCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.updateCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating cart item', error);
      }
    );
  }
}
*/
/*
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  username: string = '';
  token: string = '';

  constructor(private cartControllerService: CartControllerService, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  async loadCartItems(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: GetCartItems$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username
    };

    this.cartControllerService.getCartItems(params).subscribe(
      (data) => {
        this.cartItems = data.items || [];
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  async addItemToCart(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: AddItemToCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.addItemToCart(params).subscribe(
      (data) => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  async clearCart(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: ClearCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
    };

    this.cartControllerService.clearCart(params).subscribe(
      () => {
        this.cartItems = [];
      },
      (error) => {
        console.error('Error clearing cart', error);
      }
    );
  }

  async removeItem(itemId: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const params: RemoveItem$Params = {
      'itemId': itemId
    };

    this.cartControllerService.removeItem(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error removing item from cart', error);
      }
    );
  }

  async updateCartItem(productId: number, quantity: number): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';

    const body = {
      'productId': productId,
      'quantity': quantity
    };
    const params: UpdateCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

    this.cartControllerService.updateCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating cart item', error);
      }
    );
  }
}

*/
/*
import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/shared/cart-service';
import {CartControllerService} from '../../services/cart/services/cart-controller.service';
import {GetCartItems$Params} from '../../services/cart/fn/cart-controller/get-cart-items';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {AddItemToCart$Params} from '../../services/cart/fn/cart-controller/add-item-to-cart';
import {ClearCart$Params} from '../../services/cart/fn/cart-controller/clear-cart';
import {RemoveItem$Params} from '../../services/cart/fn/cart-controller/remove-item';
import {UpdateCart$Params} from '../../services/cart/fn/cart-controller/update-cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  username: string = '' || undefined;
  token: string = '' || undefined;

  constructor(private cartControllerService: CartControllerService, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartControllerService.getCartItems(this.username).subscribe(
      (data) => {
        this.cartItems = data.items;
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  async addItemToCart(productId: number, quantity: number): Promise<void> {
    if (this.username && this.token) {
    this.username! = await this.keycloakService.getUsernameFromToken();
    this.token! = await this.keycloakService.getToken();

      const body = {
        'productId': productId,
        'quantity': quantity
      }
    const params: AddItemToCart$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username,
      body
    };

      this.cartControllerService.addItemToCart(params).subscribe(
        (data) => {
          this.loadCartItems();
        },
        (error) => {
          console.error('Error adding item to cart', error);
        }
      );
    }
  }

  clearCart(): void {
    if (this.username && this.token) {
      this.username! = await this.keycloakService.getUsernameFromToken();
      this.token! = await this.keycloakService.getToken();

      const params: ClearCart$Params = {
        'Authorization': `Bearer ${this.token}`,
        'X-Username': this.username,
      };

      this.cartControllerService.clearCart(params).subscribe(
        () => {
          this.cartItems = [];
        },
        (error) => {
          console.error('Error clearing cart', error);
        }
      );
    }
  }

  removeItem(itemId: number): void {

    if (this.username && this.token) {
      this.username! = await this.keycloakService.getUsernameFromToken();
      this.token! = await this.keycloakService.getToken();

      const params: RemoveItem$Params = {
        'itemId': itemId
      };

      this.cartControllerService.removeItem(params).subscribe(
        () => {
          this.loadCartItems();
        },
        (error) => {
          console.error('Error removing item from cart', error);
        }
      );
    }
  }

  updateCartItem(productId: number, quantity: number): void {

    if (this.username && this.token) {
      this.username! = await this.keycloakService.getUsernameFromToken();
      this.token! = await this.keycloakService.getToken();

      const body = {
        'productId': productId,
        'quantity': quantity
      }

      const params: UpdateCart$Params = {
        'Authorization': `Bearer ${this.token}`,
        'X-Username': this.username,
        body
      };
    this.cartControllerService.updateCart(params).subscribe(
      () => {
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating cart item', error);
      }
    );
  }
}




/*
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/shared/cart-service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CartItem } from '../../services/cart/models/cart-item';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [NgIf, NgFor, CommonModule],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartItemCount: number = 0;
  subTotal: number = 0;

  constructor(private cartService: CartService, private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    this.subscribeToCart();
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();
      if (token && username) {
        this.cartService.fetchCartItems(token, username);
      }
    } catch (error) {
      console.log('Error retrieving user details', error);
    }
  }

  private subscribeToCart(): void {
    this.cartService.cartItems$.subscribe(items => {
      if (items) {
        this.cartItems = items;
        this.cartItemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
        this.subTotal = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
      }
    });
  }

  removeItem(cartItemId: number | undefined): void {
    if (cartItemId !== undefined) {
      this.cartService.removeItem(cartItemId);
    } else {
      console.error('Cart item ID is undefined');
    }
  }
}

*/
/*

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/shared/cart-service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [NgIf, NgFor, CommonModule],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscribeToCart();
    // Fetch cart items on component initialization
    const token = 'your-token'; // Replace with actual token
    const username = 'your-username'; // Replace with actual username
    this.cartService.fetchCartItems(token, username);
  }

  private subscribeToCart(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}


 */
/*
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { CartControllerService } from '../../services/cart/services';
import { GetCartItems$Params } from '../../services/cart/fn/cart-controller/get-cart-items';
import { CommonModule } from '@angular/common';
import { RemoveItem$Params } from '../../services/cart/fn/cart-controller/remove-item';
import { CartService } from '../../services/shared/CartService';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
})

export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.subscribeToCart();
  }

  private subscribeToCart(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
*/
/*
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  totalAmount: number = 0;

  cartService = inject(CartService);
  keycloakService = inject(KeycloakService);
  cartControllerService = inject(CartControllerService);
  router = inject(Router);

  username: string | null = null;

  constructor() {}

  async ngOnInit(): Promise<void> {
    try {
      // Fetch the token and username from the Keycloak service
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      // If token or username is missing, log and exit
      if (!token || !username) {
        console.warn('Cannot fetch cart items: Missing token or username.');
        return;
      }

      // Use cart service to fetch the cart items
      await this.cartService.fetchCartItems(token, username);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle the error appropriately here (e.g., show a message)
    }
  }

  async removeFromCart(itemId: number): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      // If token or username is missing, log and exit
      if (!token || !username) {
        console.warn("Token or username is missing. Cannot remove item.");
        return;
      }

      // Remove item from cart
      const params: RemoveItem$Params = {
        'Authorization': `Bearer ${token}`,
        itemId: itemId,
      };

      // Call API to remove the item
      await this.cartControllerService.removeItem(params).toPromise();
      console.log(`Item ${itemId} removed successfully.`);

      // Reload the cart after removing item
      await this.loadCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Show a user-friendly message in case of error
    }
  }

  async loadCart(): Promise<void> {
    try {
      const username = await this.keycloakService.getUsernameFromToken();
      const token = await this.keycloakService.getToken();

      if (!token || !username) {
        console.error('Missing token or username');
        return;
      }

      const params: GetCartItems$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
      };

      this.cartControllerService.getCartItems(params).subscribe({
        next: (cart) => {
          this.cartItems = cart.items || [];
          this.cartItemCount = this.cartItems.reduce(
            (count, item) => count + (item.quantity || 0),
            0
          );
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Error loading cart items:', err);
          // Handle error (maybe reset cart or show user-friendly message)
        },
      });
    } catch (error) {
      console.error('Error fetching token or username:', error);
      // Handle the error appropriately here
    }
  }

  // Helper function to calculate total price of cart
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + (item.quantity * item.price || 0),
      0
    );
  }

  makePayment(): void {
    console.log('Redirecting to payment page...');
    this.router.navigate(['/payment']);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

}

/*

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {CartControllerService} from '../../services/cart/services';
import {GetCartItems$Params} from '../../services/cart/fn/cart-controller/get-cart-items';
import {CommonModule} from '@angular/common';
import {RemoveItem$Params} from '../../services/cart/fn/cart-controller/remove-item';
import {CartService} from '../../services/shared/CartService';
//import { KeycloakService } from 'keycloak-angular';
//import { CartControllerService, GetCartItems$Params } from 'src/app/services/cart-controller.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  totalAmount: number = 0;
  cartService = inject(CartService);

  keycloakService = inject(KeycloakService);
  cartControllerService = inject(CartControllerService);
  router = inject(Router);

  username: string | null = null;

  constructor() {}

  async ngOnInit(): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.warn("Cannot fetch cart items: Missing token or username.");
        return;
      }

      this.cartService.fetchCartItems(token, username);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  /*
    async ngOnInit(): Promise<void> {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();
      this.cartService.fetchCartItems(token!, username!);
    }
  /*
    async ngOnInit(): Promise<void> {
      try {
        await this.loadCart();
      } catch (error) {
        console.error('Error during cart initialization:', error);
      }
    }
  */
/*
  async loadCart(): Promise<void> {
    try {
      const username = localStorage.getItem('username');
      const token = await this.keycloakService.getToken();

      console.log("Token retrieved:", token);
      console.log("Username retrieved:", username);

      if (!token || !username) {
        console.error('Missing token or username');
        return;
      }

      const params: GetCartItems$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username
      };

      this.cartControllerService.getCartItems(params).subscribe({
        next: (cart) => {
          this.cartItems = cart.items || [];

          this.cartItemCount = this.cartItems.reduce(
            (count, item) => count + (item.quantity || 0),
            0
          );
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Error loading cart items:', err);
          this.resetCart();
        },
      });

    } catch (error) {
      console.error('Error fetching token or username:', error);
      this.resetCart();
    }
  }

  async removeFromCart(itemId: number): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.warn("Token or username is missing. Cannot remove item.");
        return;
      }

      const params: RemoveItem$Params = {
        'Authorization': `Bearer ${token}`,
        itemId: itemId
      };

      await this.cartControllerService.removeItem(params).toPromise(); // Ensure completion before proceeding
      console.log(`Item ${itemId} removed successfully.`);

      await this.loadCart(); // Reload cart after removing item
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }


  /*
  async removeFromCart(itemId: number): Promise<void> {
    const token = await this.keycloakService.getToken();
    const params: RemoveItem$Params = {
      'Authorization': `Bearer ${token}`,
      itemId: itemId
    };*/
/*
    async removeFromCart(itemId: number): Promise<void> {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      const params: RemoveItem$Params = {
        'Authorization': `Bearer ${token}`,
        itemId: itemId
      }
     // this.cartService.removeItemFromCart(itemId, token, username);

    this.cartControllerService.removeItem(params);
    await this.loadCart();
  }
*/
  /*
    async loadCart(): Promise<void> {
      try {
        // Get username from local storage
        this.username = localStorage.getItem('username');
        if (!this.username) {
          console.error('Username not found in local storage.');
          return;
        }

        const token = await this.keycloakService.getToken();
        if (!token) {
          console.error('Missing authentication token.');
          return;
        }

        const params: GetCartItems$Params = {
          'Authorization': `Bearer ${token}`,
          'X-Username': this.username,
        };

        this.cartControllerService.getCartItems(params).subscribe({
          next: (cart) => {
            this.cartItems = cart.items || [];
            this.cartItemCount = this.cartItems.reduce(
              (count, item) => count + (item.quantity || 0),
              0
            );
            this.calculateTotal();
          },
          error: (err) => {
            console.error('Error loading cart items:', err);
            this.resetCart();
          },
        });

      } catch (error) {
        console.error('Error fetching token or username:', error);
        this.resetCart();
      }
    }
  */
/*
  private resetCart(): void {
    this.cartItems = [];
    this.cartItemCount = 0;
    this.totalAmount = 0;
  }

  private calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  makePayment(): void {
    console.log('Redirecting to payment page...');
    this.router.navigate(['/payment']);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }


}



/*

import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, NgFor, NgIf} from '@angular/common';

import {CartControllerService} from '../../services/cart/services/cart-controller.service';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {UpdateCart$Params} from '../../services/cart/fn/cart-controller/update-cart';
import {RemoveItem$Params} from '../../services/cart/fn/cart-controller/remove-item';
import {AddItemToCart$Params} from '../../services/cart/fn/cart-controller/add-item-to-cart';
import {getCartItems, GetCartItems$Params} from '../../services/cart/fn/cart-controller/get-cart-items';

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  totalAmount: number = 0;
  keycloakService = inject(KeycloakService)
  username: string | undefined | null
  //token?: string
  cartControllerService = inject(CartControllerService)
  router = inject(Router)

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadCart();
    } catch (error) {
      console.error('Error during cart initialization:', error);
    }
  }

  async loadCart(): Promise<void> {
    try {
      // Get username from local storage instead of Keycloak service
      this.username = localStorage.getItem('username');
      const token = await this.keycloakService.getToken();

      if (!token || !this.username) {
        console.error('Missing token or username');
        return;
      }

      const params: GetCartItems$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': this.username,
      };

      this.cartControllerService.getCartItems(params).subscribe({
        next: (cart) => {
          this.cartItems = cart.items || [];
          this.cartItemCount = this.cartItems.reduce(
            (count, item) => count + (item.quantity || 0),
            0
          );
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Error loading cart items:', err);
          this.cartItems = []; // Reset cart on error
          this.cartItemCount = 0;
        },
      });

    } catch (error) {
      console.error('Error fetching token or username:', error);
      this.cartItems = []; // Reset cart in case of exception
      this.cartItemCount = 0;
    }
  }


  async addToCart(productId: number, quantity: number): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.error('Missing token or username');
        return;
      }

      // Prepare the request body
      const body = {
        productId,
        quantity,
      };

      // Prepare the request params
      const params: AddItemToCart$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
        //'Content-Type': 'application/json',
        body,
      };

      // Call the service to add the item to the cart
      this.cartControllerService.addItemToCart(params).subscribe({
        next: () => {
          console.log('Product added to cart:', productId);
          //this.router.navigate(['/cart']); // Navigate to the cart page
        },
        error: (err) => {
          console.error('Error adding product to cart:', err);
        },
      });
    } catch (error) {
      console.error('Error fetching token or username:', error);
    }
  }

  /*
    async addToCart(productId: number, quantity: number): Promise<void> {
      try {
        const token = await this.keycloakService.getToken(); // Fetch the full access token
        const username = await this.keycloakService.getUsernameFromToken();

        if (!token || !username) {
          console.error('Missing token or username');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          'X-Username': username,
        };

        const body = {
          productId,
          quantity,
        };

        this.cartControllerService.addItemToCart({Authorization: `Bearer ${token}`, 'X-Username': username, body }).subscribe({
          next: () => {
            console.log('Product added to cart:', productId);
            this.router.navigate(['/cart']);
          },
          error: (err) => {
            console.error('Error adding product to cart:', err);
          },
        });
      } catch (error) {
        console.error('Error fetching token or username:', error);
      }
    }
  */

  /*
    async addToCart(product: any): Promise<void> {
      if (!this.username) {
        try {
          this.username = await this.keycloakService.getUsernameFromToken();
          if (!this.username) {
            console.error('Username not found in token.');
            return;
          }
        } catch (err) {
          console.error('Error retrieving username from token:', err);
          return;
        }
      }

      const existingProduct = this.cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

      const params: UpdateCart$Params = {
        'X-Username': this.username,
        body: {
          productId: product.id,
          quantity: existingProduct ? existingProduct.quantity : 1,
        },
      };

      this.cartControllerService.updateCart(params).subscribe({
        next: () => {
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
        },
      });
    }
  */

/*
  removeFromCart(itemId: number): void {
    const params: RemoveItem$Params = {itemId};

    this.cartControllerService.removeItem(params).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error removing item from cart:', err);
      },
    });
  }


  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  makePayment(): void {
    console.log('Redirecting to payment page...');
    this.router.navigate(['/payment']);
  }
}


/*

import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, NgFor, NgIf} from '@angular/common';

import {CartControllerService} from '../../services/cart/services/cart-controller.service';

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  totalAmount: number = 0;

  constructor(private cartControllerService: CartControllerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartControllerService.getCartItems();
    this.cartItemCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.calculateTotal();
  }

  removeFromCart(itemId: number): void {
    this.cartControllerService.removeItem(itemId);
    this.loadCart();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  makePayment(): void {
    console.log('Redirecting to payment page...');
    this.router.navigate(['/payment']);
  }
}
*/


/*
cartItems: any[] = [];



// Add a product to the cart

// Remove a product from the cart
removeFromCart(productId: number) {
  this.cartItems = this.cartItems.filter(item => item.id !== productId);
  this.calculateTotal();
}

// Calculate the total price of the cart

}


 */
