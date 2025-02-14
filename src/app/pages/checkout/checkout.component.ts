import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderControllerService } from '../../services/order/services';
import { OrderRequest } from '../../services/order/models/order-request';
import { PurchaseRequest } from '../../services/order/models/purchase-request';

import { NgFor, NgIf } from '@angular/common';
import {CartControllerService} from '../../services/cart/services/cart-controller.service';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {GetCartItems$Params} from '../../services/cart/fn/cart-controller/get-cart-items'; // Adjust the path as needed

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: any[] = [];  // Assuming cart items are fetched from the service
  isLoading = true; // Flag to show loading spinner
  errorMessage: string | null = null;

  private cartControllerService = inject(CartControllerService)
  username?: string
  keycloakService = inject(KeycloakService)

  constructor(
    private fb: FormBuilder,
    private orderControllerService: OrderControllerService,
    private router: Router,
   // Assuming you have this service to fetch cart items
  ) {
    // Initialize the form
    this.checkoutForm = this.fb.group({
      userId: ['', [Validators.required]],
      totalAmount: [{ value: 0, disabled: true }], // Assuming total amount is calculated on the front-end
      paymentMethod: ['', [Validators.required]],
      products: this.fb.array([]) // Initialize as FormArray
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.error('Missing token or username');
        return;
      }

      const params: GetCartItems$Params = {
        'Authorization': `Bearer ${token}`,
        'X-Username': username,
      }

      this.username = await this.keycloakService.getUsernameFromToken();
      this.cartControllerService.getCartItems(params).subscribe({
        next: (cart) => {
          this.cartItems = cart.items || [];
          this.initializeProducts();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching cart items:', err);
          this.isLoading = false;
          this.errorMessage = 'Error fetching cart items.';
        }
      })
    }
    catch (error) {
        console.error('Error fetching token or username:', error);
      }
  }

  // Initialize the FormArray with cart items
  initializeProducts(): void {
    const productsFormArray = this.checkoutForm.get('products') as FormArray;

    // For each cart item, create a form group and add it to the products array
    this.cartItems.forEach(item => {
      productsFormArray.push(this.fb.group({
        productId: [item.productId, [Validators.required]],
        quantity: [item.quantity, [Validators.required, Validators.min(1)]]
      }));
    });

    // Calculate the total amount
    const totalAmount = this.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    this.checkoutForm.patchValue({ totalAmount });
  }
/*
  // Handle the checkout process
  checkout(): void {
    if (this.checkoutForm.valid) {
      const orderRequest: OrderRequest = {
        reference: 'ORDER_' + Date.now(), // Generate a reference
        totalAmount: this.checkoutForm.value.totalAmount,
        paymentMethod: this.checkoutForm.value.paymentMethod,
        products: this.checkoutForm.value.products.map((product: { productId: any; quantity: any; }) => ({
          productId: product?.productId,
          quantity: product.quantity
        })) as PurchaseRequest[]
      };

      this.orderControllerService.createOrder({ 'X-Username': 'testuser', body: orderRequest }).subscribe({
        next: (orderId: number) => {
          console.log('Order created successfully with ID:', orderId);
          //this.cartControllerService.clearCart(); // Clear the cart after order creation
          this.router.navigate(['/order-success', orderId]);  // Navigate to order success page
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.errorMessage = 'Failed to complete the purchase. Please try again.';  // Set error message
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }*/

  // Handle payment
  makePayment(): void {
    console.log('Processing payment...');
    // Call your payment processing method here (e.g., integration with a payment gateway)
  }


/*

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderControllerService } from '../../services/order/services';
import { OrderRequest } from '../../services/order/models/order-request'; // Adjust the path as needed
import { PurchaseRequest } from '../../services/order/models/purchase-request';
import {NgFor, NgIf} from '@angular/common'; // Adjust the path as needed

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderControllerService: OrderControllerService,
    private router: Router
  ) {
    // Initialize the form
    this.checkoutForm = this.fb.group({
      userId: ['', [Validators.required]],
      totalAmount: [{ value: 0, disabled: true }], // Assuming total amount is calculated on the front-end
      paymentMethod: ['', [Validators.required]],
      products: this.fb.array([]) // Initialize as FormArray
    });
  }

  ngOnInit(): void {
    // Example: You might want to set the products if passed via state
    //this.initializeProducts();
  }
/*
  initializeProducts(): void {
    // For example, getting products from router state
    const navigation = this.router.getCurrentNavigation();
    //if (navigation && navigation.extras.state && navigation.extras.state.selectedProducts) {
     // const selectedProducts = navigation.extras.state.selectedProducts;

      const productsFormArray = this.checkoutForm.get('products') as FormArray;

      // Create a form control for each selected product
     // selectedProducts.forEach(product => {
        productsFormArray.push(this.fb.group({
         // productId: [product.id, [Validators.required]], // Assuming product has an id property
         // quantity: [1, [Validators.required, Validators.positive]] // Default quantity to 1
        }));
      });

      // Optionally, set the total amount based on the selected products
     // const totalAmount = selectedProducts.reduce((acc, product) => acc + product.buyNowPrice, 0);
    //  this.checkoutForm.patchValue({ totalAmount });
    }
  }
*/

  /*
  checkout(): void {
    const username = this.keycloakService.getUsernameFromToken();
    const cartItems = this.cartService.getCartItems();

    if (!username || cartItems.length === 0) {
      this.errorMessage = 'Cart is empty or user not authenticated';
      return;
    }

    // Prepare order details
    const orderRequest: CreateOrder$Params = {
      'X-Username': username,
      body: {
        paymentMethod: 'CREDIT_CARD', // Or get this from the user input
        products: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        reference: 'some-unique-reference',  // Generate or use a reference for the order
        totalAmount: this.calculateTotal(cartItems)  // Calculate the total from the cart items
      }
    };

    // Call the API to create the order
    this.orderControllerService.createOrder(orderRequest).subscribe({
      next: (orderId: number) => {
        console.log('Order created successfully with ID:', orderId);
        this.cartService.clearCart(); // Clear the cart after order creation
        this.router.navigate(['/checkout']);  // Navigate to checkout page
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.errorMessage = 'Failed to complete the purchase. Please try again.';  // Set error message
      }
    });
  }

  private calculateTotal(cartItems: { productId: number; quantity: number }[]): number {
    // Implement the total calculation based on the products in the cart
    return cartItems.reduce((total, item) => total + (item.quantity * this.getProductPrice(item.productId)), 0);
  }

  private getProductPrice(productId: number): number {
    // Fetch the product price based on the productId (this could be an API call)
    return 100; // This is just a placeholder value
  }

/*
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const orderRequest: OrderRequest = {
       // orderId: undefined,
        reference: 'ORDER_' + Date.now(), // Generate a reference
        totalAmount: this.checkoutForm.value.totalAmount,
        paymentMethod: this.checkoutForm.value.paymentMethod,
        //userId: this.checkoutForm.value.userId,
        products: this.checkoutForm.value.products.map((product: { productId: any; quantity: any; }) => ({
          productId: product?.productId,
          quantity: product.quantity
        })) as PurchaseRequest[]
      };

      this.orderControllerService.createOrder({'X-Username':, body: orderRequest}).subscribe({
        next: (orderId: number) => {
          console.log('Order created successfully with ID:', orderId);
          // Navigate to a success page or the order details page
          this.router.navigate(['/order-success', orderId]);
        },
        error: (error) => {
          console.error('Error creating order:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  */


}
