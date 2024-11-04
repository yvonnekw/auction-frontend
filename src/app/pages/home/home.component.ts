import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common'; // <-- Import CommonModule
import {ProductControllerService} from '../../services/product/services/product-controller.service';
//import { ProductService } from '../../services/shared/product.service'; // Update with the correct path
import {ProductResponse} from '../../services/product/models/product-response';
import {Product} from '../../services/product/models/product';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {Router} from '@angular/router';
import {CheckoutComponent} from '../checkout/checkout.component';
import {ProductSelectionService} from '../../services/customServices/product-selection.service';
import {OrderControllerService} from '../../services/order/services/order-controller.service';
import {ProductRequest} from '../../services/product/models/product-request';
//import {error} from '@angular/compiler-cli/src/transformers/util';
import {CreateOrder$Params} from '../../services/order/fn/order-controller/create-order';

import {PurchaseRequest} from '../../services/order/models/purchase-request';
import {OrderRequest} from '../../services/order/models/order-request';

//import { ProductControllerService } from '../../services/product/services/product-controller.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private productControllerService: ProductControllerService,
              private keycloakService: KeycloakService, private orderControllerService: OrderControllerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productControllerService.getAllProducts().subscribe({
      next: (response: ProductResponse[]) => {
        console.log('Products fetched:', response);
        this.products = response; // Store the response in the products array
        this.isLoading = false; // Update loading state
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false; // Update loading state
      }
    });
  }


  submitBid(product: Product): void {
    alert(`Bid submitted for ${product.productName} at price ${product.buyNowPrice}`);
    // Implement bid submission logic here
  }

  buyNow(_orderRequest: OrderRequest, purchaseRequest: PurchaseRequest): void {
    const orderRequest: CreateOrder$Params = {
      body: {
        orderId: _orderRequest.orderId,
        paymentMethod: 'CREDIT_CARD',
        products: [
          {
            productId: purchaseRequest.productId,
            quantity: purchaseRequest.quantity
          }
        ],
        reference: _orderRequest.reference,
        totalAmount: _orderRequest.totalAmount,
        userId: _orderRequest.userId
      }
    };

    this.orderControllerService.createOrder(orderRequest).subscribe({
      next: (orderId: number) => {
        console.log('Order created successfully with ID:', orderId);
        this.router.navigate(['/checkout']);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.errorMessage = 'Failed to complete the purchase. Please try again.';
      }
    });
  }


  async login(): Promise<void> {
    try {
      await this.keycloakService.login(); // Call the login method from KeycloakService
      console.log("Logging in");
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloakService.logout(); // Call the logout method from KeycloakService
      console.log("Logging out");
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async register(): Promise<void> {
    await this.keycloakService.register();
  }

}
