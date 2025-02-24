import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartControllerService} from '../cart/services/cart-controller.service';
import {GetCartItems$Params} from '../cart/fn/cart-controller/get-cart-items';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private cartControllerService: CartControllerService) {}

  fetchCartItems(token: string, username: string) {
    const params: GetCartItems$Params = {
      Authorization: `Bearer ${token}`,
      'X-Username': username
    };

    this.cartControllerService.getCartItems(params).subscribe(response => {
      const cart = response;
      const items = cart.items || [];
      this.cartItemsSubject.next(items); // Update cart items
      this.cartItemCountSubject.next(items.reduce((count, item) => count + (item.quantity || 0), 0)); // Update item count
    }, error => {
      console.error('Error fetching cart items:', error);
    });
  }

  removeItemFromCart(itemId: number, token: string, username: string) {
    const params = {
      Authorization: `Bearer ${token}`,
      itemId: itemId
    };

    this.cartControllerService.removeItem(params).subscribe(() => {
      this.fetchCartItems(token, username); // Refresh cart after removing
    }, error => {
      console.error('Error removing item:', error);
    });
  }
}
/*
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartControllerService } from '../cart/services/cart-controller.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private cartControllerService: CartControllerService) {}

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
        this.cartItemsSubject.next(items); // 🔹 Update cart items
        this.cartItemCountSubject.next(items.reduce((count, item) => count + (item.quantity || 0), 0)); // 🔹 Update item count
      });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  async removeItemFromCart(itemId: number, token: string, username: string) {
    try {
      const params = {
        'Authorization': `Bearer ${token}`,
        itemId: itemId
      };

      await this.cartControllerService.removeItem(params).toPromise();
      this.fetchCartItems(token, username); // 🔹 Refresh cart after removing
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }
}
*/
