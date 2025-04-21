import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // <-- Import CommonModule
import { ProductControllerService } from '../../services/product/services/product-controller.service';
import { ProductResponse } from '../../services/product/models/product-response';
import { Product } from '../../services/product/models/product';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartControllerService } from '../../services/cart/services/cart-controller.service';
import { AddItemToCart$Params } from '../../services/cart/fn/cart-controller/add-item-to-cart';
import { CartRequest } from '../../services/cart/models/cart-request';
import {OrderControllerService} from '../../services/order/services';
import {ImageProxyService} from '../../services/shared/ImageProxyService';
import {Observable} from 'rxjs';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  http = inject(HttpClient)
  productControllerService = inject(ProductControllerService)
  orderControllerService = inject(OrderControllerService)
  router = inject(Router)
  keycloakService = inject(KeycloakService)
  cartControllerService = inject(CartControllerService)
  username?: string
  imageProxyService = inject(ImageProxyService)

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productControllerService!.getAllProducts().subscribe({
      next: (response: ProductResponse[]) => {
        console.log('Products fetched:', response);
        this.products = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getImageUrl(productImageUrl: string): Observable<SafeUrl> {
    return this.imageProxyService.getImageUrl(productImageUrl);
  }

  submitBid(product: Product): void {
    this.router.navigate(['/submit-bid', product.productId], {
      queryParams: { productId: product.productId, productName: product.productName }
    }).then(r => {
      // Handle navigation result if necessary
    });
  }

  handleUndefinedProductId(): void {
    console.error('Product ID is undefined. Cannot add to cart.');
  }

  async addToCart(productId: number, quantity: number = 1): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.error('Missing token or username');
        await this.keycloakService.login();
        return;
      }

      const body: CartRequest = { productId, quantity };

      const params: AddItemToCart$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
        body
      };

      this.cartControllerService.addItemToCart(params).subscribe({
        next: () => {
          console.log('Product added to cart:', productId);
        },
        error: (err) => {
          console.error('Error adding product to cart:', err);
        },
      });
    } catch (error) {
      console.error('Error fetching token or username:', error);
    }
  }

  async buyNow(productId: number | undefined, quantity: number | undefined): Promise<void> {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }

    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        this.errorMessage = 'User is not authenticated';
        console.error('Missing token or username');
        return;
      }

      const body = { productId, quantity: quantity ?? 1 };

      const params: AddItemToCart$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
        body
      };

      this.cartControllerService.addItemToCart(params).subscribe({
        next: () => {
          console.log('Product added to cart:', productId);
        },
        error: (err) => {
          console.error('Error adding product to cart:', err);
        },
      });
    } catch (error) {
      console.error('Error retrieving username or adding product to cart:', error);
    }
  }
}
