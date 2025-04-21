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
