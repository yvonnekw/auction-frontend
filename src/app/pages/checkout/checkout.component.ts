import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderControllerService } from '../../services/order/services/order-controller.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { CartControllerService } from '../../services/cart/services/cart-controller.service';
import  { PaymentRequest } from '../../services/order/models/payment-request'
import { ClearCart$Params } from '../../services/cart/fn/cart-controller/clear-cart';
import { CreateOrder$Params } from '../../services/order/fn/order-controller/create-order';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {OrderPaymentRequest} from '../../services/order/models/order-payment-request';
import {OrderRequest} from '../../services/order/models/order-request';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: Array<{ productId: number; productName: string; quantity: number; price: number }> = [];
  totalAmount: number = 0;
  username: string = '';
  token: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(
    private orderService: OrderControllerService,
    private router: Router,
    private keycloakService: KeycloakService,
    private cartService: CartControllerService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.cartItems = navigation.extras.state['cartItems'];
      this.totalAmount = navigation.extras.state['totalAmount'];
    }
  }

  async ngOnInit() {
    await this.loadUserDetails();
  }



  async loadUserDetails(): Promise<void> {
    this.username = (await this.keycloakService.getUsernameFromToken()) || '';
    this.token = (await this.keycloakService.getToken()) || '';
    this.firstName = this.keycloakService.getFirstName() || '';
    this.lastName = this.keycloakService.getLastName() || '';
    this.email = this.keycloakService.getEmail() || '';
  }

  onSubmit(): void {
    const orderRequest:  OrderRequest = {
      //reference: 'ORDER-REF-001',
      products: this.cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
      totalAmount: this.totalAmount,
    };
/*
    const paymentRequest = {
      paymentMethod: 'CREDIT_CARD',
      reference: 'ORDER-REF-001',
      paymentDetails: {
        cardNumber: '4111111111111111',
        cardExpiry: '12/25',
        cardCVC: '123',
      }
    };*/

    const paymentRequest: PaymentRequest = {
      amount: this.totalAmount,
      isSuccessful: true,
      paymentMethod:  'CREDIT_CARD'
    }

    const body: OrderPaymentRequest ={
      orderRequest,
      paymentRequest
    }

    const idempotencyKey = uuidv4();

    const newOrder: CreateOrder$Params = {
      Authorization: `Bearer ${this.token}`,
      'X-Username': this.username,
      'X-FirstName': this.firstName,
      'X-LastName': this.lastName,
      'X-Email': this.email,
      'Idempotency-Key': idempotencyKey,
        body
    };

    this.orderService.createOrder(newOrder).subscribe(response => {
      console.log('Order created:', response);
      const clearCartParams: ClearCart$Params = {
        Authorization: `Bearer ${this.token}`,
        'X-Username': this.username
      };
      this.cartService.clearCart(clearCartParams).subscribe(() => {
        console.log('Cart cleared');
      });
      this.router.navigate(['/orders']);
    }, error => {
      console.error('Error creating order:', error);
    });
  }
}
