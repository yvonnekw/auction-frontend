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
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const orderRequest: OrderRequest = {
        orderId: undefined,
        reference: 'ORDER_' + Date.now(), // Generate a reference
        totalAmount: this.checkoutForm.value.totalAmount,
        paymentMethod: this.checkoutForm.value.paymentMethod,
        userId: this.checkoutForm.value.userId,
        products: this.checkoutForm.value.products.map((product: { productId: any; quantity: any; }) => ({
          productId: product?.productId,
          quantity: product.quantity
        })) as PurchaseRequest[]
      };

      this.orderControllerService.createOrder({ body: orderRequest }).subscribe({
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
}
