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


/*
import { Injectable } from '@angular/core';
import { CartControllerService } from '../cart/services/cart-controller.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(private cartControllerService: CartControllerService) {}

  fetchCartItems(token: string, username: string): void {
    const params = {
      'Authorization': `Bearer ${token}`,
      'X-Username': username,
    };

    this.cartControllerService.getCartItems(params).pipe(
      map(cart => (cart.items || []).reduce((count, item) => count + (item.quantity || 0), 0))
    ).subscribe({
      next: (count) => this.cartItemCount.next(count),
      error: (err) => console.error('Error fetching cart items:', err),
    });
  }

  removeItemFromCart(itemId: number, token: string, username: string): void {
    const params = { itemId, 'Authorization': `Bearer ${token}`, 'X-Username': username };

    this.cartControllerService.removeItem(params).subscribe({
      next: () => {
        console.log(`Item ${itemId} removed successfully`);
        this.fetchCartItems(token, username);
      },
      error: (err) => console.error('Error removing item:', err),
    });
  }
}
*/
