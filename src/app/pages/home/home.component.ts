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
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ImageProxyService} from '../../services/shared/ImageProxyService';
import {Observable} from 'rxjs';

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

/*
import {Component, inject, OnInit} from '@angular/core';
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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CreateProductComponent} from '../create-product/create-product.component';

import {CartControllerService} from '../../services/cart/services/cart-controller.service';
import {RemoveItem$Params} from '../../services/cart/fn/cart-controller/remove-item';
import {AddItemToCart$Params} from '../../services/cart/fn/cart-controller/add-item-to-cart';
import {CartRequest} from '../../services/cart/models/cart-request';
import {CartComponent} from '../cart/cart.component';

//import { ProductControllerService } from '../../services/product/services/product-controller.service';

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
 productControllerService =inject(ProductControllerService)
  orderControllerService = inject(OrderControllerService)
  router = inject(Router)
  keycloakService = inject(KeycloakService)
  cartControllerService = inject(CartControllerService)
  username?: string

  */

  //product = inject(Product)
/*
      constructor(private productControllerService: ProductControllerService,
                  private keycloakService: KeycloakService, private orderControllerService: OrderControllerService,
                  private router: Router) {
      }*/
    //| undefined
/*
  constructor(private productControllerService: ProductControllerService,
              private keycloakService: KeycloakService, private orderControllerService: OrderControllerService,
              private router: Router) {
  }*/
/*
  ngOnInit(): void {
    this.getProducts();
  }

 */
/*
  getProducts(): void {
    this.isLoading = true;

    this.productControllerService.getAllProducts().subscribe({
      next: (response: ProductResponse[]) => {
        console.log('Products fetched:', response);
        this.products = response;
        this.isLoading = false; // Stop the loading spinner
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false; // Stop the loading spinner
      },
    });
  }
*/
  /*
    getProducts(): void {
      this.isLoading = true; // Start the loading spinner

      this.keycloakService.getToken(false).then((token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        this.productControllerService.getAllProducts(headers).subscribe({
          next: (response: ProductResponse[]) => {
            console.log('Products fetched:', response);
            this.products = response;
            this.isLoading = false; // Stop the loading spinner
          },
          error: (error) => {
            console.error('Error fetching products:', error);
            this.errorMessage = 'Failed to load products. Please try again later.';
            this.isLoading = false; // Stop the loading spinner
          },
        });
      }).catch((error) => {
        console.error('Error fetching token:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false; // Stop the loading spinner
      });
    }
  */
/*
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

  submitBid(product: Product): void {
    // Dynamically set the productId in the route path
    this.router.navigate(['/submit-bid', product.productId], {
      queryParams: {productId: product.productId, productName: product.productName}
    }).then(r => {

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
        await this.login()
        return;
      }

      // Construct the request body
      const body: CartRequest = {
        productId,
        quantity,
      };

      // Construct the parameters
      const params: AddItemToCart$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
        body
      };

      // Call the service to add the item to the cart
      this.cartControllerService.addItemToCart(params).subscribe({
        next: () => {
          console.log('Product added to cart:', productId);
          //this.router.navigate(['/checkout']); // Navigate to the cart page
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
    submitBid(product: Product): void {
      this.router.navigate(['/submit-bid/:productId'], {queryParams: { productId: product.productId, productName: product.productName},
      });
    }*/
  /*
  submitBid(product: Product): void {
    if (!product || !product.productId) {
      this.errorMessage = 'Invalid product selected for bidding.';
      return;
    }

    // Navigate to the SubmitBidComponent, passing the productId as a route parameter
    this.router.navigate(['/submit-bid', product.productId]);
  }
   */
/*
  addToCart(productId: number, quantity: number): void {
    try {
    const username = this.keycloakService.getUsernameFromToken();

    const body = {
      productId,
      quantity,
    };

    // Prepare the request params
    const params: AddItemToCart$Params = {
      'X-Username': username,
      body, // The body should contain the productId and quantity
    };

    if (!username) {
      this.errorMessage = 'User is not authenticated';
      return;
    }

    this.cartControllerService.addItemToCart(productId);
    console.log('Product added to cart:', product.productId);

    // Optional: Navigate to the cart page after adding the product
    this.router.navigate(['/cart']);
  }
*/
/*
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

      console.log('Username: ', username);
      console.log('Token: ', token);

      const body = {
        productId,
        quantity: quantity ?? 1,
      };

      const params: AddItemToCart$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
        //'Content-Type': 'application/json',
        body,
      };

      console.log('cart params: ', params);

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
*/
  /*
    async buyNow(productId: number | undefined, quantity: number | undefined): Promise<void> {
      if (!productId) {
        console.error('Product ID is undefined');
        return;
      }

      try {
        // Retrieve username and token
        const username = await this.keycloakService.getUsernameFromToken();
        const token = await this.keycloakService.getToken();

        if (!username || !token) {
          this.errorMessage = 'User is not authenticated';
          console.error('Missing username or token');
          return;
        }

        console.log('Username:', username);
        console.log('Token:', token);

        // Prepare request headers
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'X-Username': username,
        });

        // Prepare API call parameters
        const params: AddItemToCart$Params = {
          'X-Username': username,
          body: {
            productId,
            quantity: quantity ?? 1, // Default to 1 if quantity is undefined
          },
        };

        // Call the API to add the item to the cart
        this.cartControllerService.addItemToCart(params, { Authorization: `Bearer ${token}`,
          'X-Username': username, }).subscribe({
          next: () => {
            console.log('Product added to cart:', productId);
            this.router.navigate(['/cart']); // Navigate to the cart page
          },
          error: (err) => {
            console.error('Error adding product to cart:', err);
          },
        });
      } catch (error) {
        console.error('Error retrieving username or adding product to cart:', error);
      }
    }
  */

  /*
  async buyNow(productId: number | undefined, quantity: number | undefined): Promise<void> {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }

    try {
      const username = await this.keycloakService.getUsernameFromToken();
      const token = await this.keycloakService.getToken()
      console.log("username ", username)
      console.log("username ", token)
      if (!username) {
        this.errorMessage = 'User is not authenticated';
        return;
      }

      const params: AddItemToCart$Params = {
        'X-Username': username,
        body: {
          productId,
          quantity: quantity ?? 1,
        },
      };

      this.cartControllerService.addItemToCart(params).subscribe({
        next: () => {
          console.log('Product added to cart:', productId);
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Error adding product to cart:', err);
        },
      });
    } catch (error) {
      console.error('Error retrieving username or adding product to cart:', error);
    }
  }

*/
/*
  async login(): Promise<void> {
    try {
      await this.keycloakService.login();
      console.log("Logging in");
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloakService!.logout(); // Call the logout method from KeycloakService
      console.log("Logging out");
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async register(): Promise<void> {
    await this.keycloakService!.register();
  }

*/

  /*
  buyNow(purchaseRequest: PurchaseRequest): void {
    const username = this.keycloakService.getUsernameFromToken();

    if (!username) {
      this.errorMessage = 'User is not authenticated';
      return;
    }

    this.cartService.addToCart(purchaseRequest.productId, purchaseRequest.quantity!);
    console.log('Product added to cart:', purchaseRequest.productId, purchaseRequest.quantity);

    this.router.navigate(['/cart']);
  }

  /*
    buyNow(purchaseRequest: PurchaseRequest): void {
      // Get the username from the KeycloakService
      const username = this.keycloakService.getUsernameFromToken();

      if (!username) {
        this.errorMessage = 'User is not authenticated';
        return;
      }

      // Prepare the product request to add the item to the cart
      const productRequest = {
        productId: purchaseRequest.productId,
        quantity: purchaseRequest.quantity,
      };

      // Call the buyNow method to add the product to the cart
      this.productControllerService.buyNow(productRequest).subscribe({
        next: (productResponse: ProductResponse) => {
          console.log('Product added to cart with ID:', productResponse.productId);
          this.router.navigate(['/cart']);  // Navigate to cart page or wherever needed
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
          this.errorMessage = 'Failed to add the product to the cart. Please try again.';  // Set error message
        },
      });
    }
  */
  /*
    buyNow(_orderRequest: OrderRequest, purchaseRequest: PurchaseRequest): void {
      // Get the username from the KeycloakService
      const username = this.keycloakService.getUsernameFromToken();

      if (!username) {
        this.errorMessage = 'User is not authenticated';
        return;
      }

      // Prepare the order request
      const orderRequest: CreateOrder$Params = {
        body: {
          paymentMethod: 'CREDIT_CARD',  // This can be dynamic based on the user's selection
          products: [
            {
              productId: purchaseRequest.productId,
              quantity: purchaseRequest.quantity,
            },
          ],
          reference: _orderRequest.reference,
          totalAmount: _orderRequest.totalAmount,
        },
        'X-Username': username  // Include the username here in the params
      };

      // Call the createOrder method to send the request to the backend
      this.orderControllerService.createOrder(username, orderRequest).subscribe({
        next: (orderId: number) => {
          console.log('Order created successfully with ID:', orderId);
          this.router.navigate(['/checkout']);  // Navigate to checkout page
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.errorMessage = 'Failed to complete the purchase. Please try again.';  // Set error message
        },
      });
    }


   */
  /*
    buyNow(_orderRequest: OrderRequest, purchaseRequest: PurchaseRequest): void {
      // Get the username from the KeycloakService
      const username = this.keycloakService.getUsernameFromToken();

      if (!username) {
        this.errorMessage = 'User is not authenticated';
        return;
      }

      // Prepare the order request
      const orderRequest: CreateOrder$Params = {
        body: {
          paymentMethod: 'CREDIT_CARD',  // This can be dynamic based on the user's selection
          products: [
            {
              productId: purchaseRequest.productId,
              quantity: purchaseRequest.quantity,
            },
          ],
          reference: _orderRequest.reference,
          totalAmount: _orderRequest.totalAmount,
        },
        //include username here
        'X-Username': username
      };

      // Call the createOrder method to send the request to the backend
      this.orderControllerService.createOrder(orderRequest, username).subscribe({
        next: (orderId: number) => {
          console.log('Order created successfully with ID:', orderId);
          this.router.navigate(['/checkout']);  // Navigate to checkout page
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.errorMessage = 'Failed to complete the purchase. Please try again.';  // Set error message
        },
      });
    }
  */
  /*
    buyNow(_orderRequest: OrderRequest, purchaseRequest: PurchaseRequest): void {
      const orderRequest: CreateOrder$Params = {
        body: {
         //orderId: _orderRequest.orderId,
          paymentMethod: 'CREDIT_CARD',
          products: [
            {
              productId: purchaseRequest.productId,
              quantity: purchaseRequest.quantity
            }
          ],
          reference: _orderRequest.reference,
          totalAmount: _orderRequest.totalAmount,
          //userId: _orderRequest.userId
        }
      };

      this.orderControllerService!.createOrder(orderRequest).subscribe({
        next: (orderId: number) => {
          console.log('Order created successfully with ID:', orderId);
          this.router!.navigate(['/checkout']);
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.errorMessage = 'Failed to complete the purchase. Please try again.';
        }
      });
    }
  */


//}
