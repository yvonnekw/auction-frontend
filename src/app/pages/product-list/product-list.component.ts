import { Component, OnInit } from '@angular/core';
import { ProductControllerService } from '../../services/product/services/product-controller.service'; // Import your service
//import { ApiConfiguration } from '../../services/shared/api-configuration';
import {NgFor, NgIf} from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  auction: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ NgIf, NgFor],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Replace 'any' with your product type
  errorMessage: string = '';

  constructor(
    private productService: ProductControllerService,
    //private apiConfig: ApiConfiguration
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        this.errorMessage = 'Error fetching products: ' + error.message;
      }
    );
  }

  submitBid(productId: number): void {
    console.log(`Submitting bid for product ID: ${productId}`);
  }

  buyNow(productId: number): void {
    console.log(`Buying product ID: ${productId}`);
  }
}
