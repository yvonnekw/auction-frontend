import { Injectable } from '@angular/core';
import { Product } from '../product/models/product';  // Import your product model

@Injectable({
  providedIn: 'root'
})
export class ProductSelectionService {
  private selectedProduct: Product | null = null; // Store the selected product

  constructor() {}

  setSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }

  // Clear the selected product
  clearSelectedProduct(): void {
    this.selectedProduct = null;
  }
}
