import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../cart/models/cart-item';
import { CartControllerService } from '../cart/services/cart-controller.service';
import { GetCartItems$Params } from '../cart/fn/cart-controller/get-cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private cartControllerService: CartControllerService) {}

  fetchCartItems(token: string, username: string): void {
    const params: GetCartItems$Params = {
      Authorization: `Bearer ${token}`,
      'X-Username': username
    };

    this.cartControllerService.getCartItems(params).subscribe(cart => {
      const items = cart.items || [];
      this.cartItemsSubject.next(items);
      this.cartItemCountSubject.next(items.reduce((count, item) => count + (item.quantity || 0), 0));
    });
  }

  removeItem(cartItemId: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.cartItemId !== cartItemId);
    this.cartItemsSubject.next(updatedItems);
    this.cartItemCountSubject.next(updatedItems.reduce((count, item) => count + (item.quantity || 0), 0));
  }
}
