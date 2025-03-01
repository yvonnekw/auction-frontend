import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductControllerService } from '../../services/product/services/product-controller.service';
import { CreateProduct$Params } from '../../services/product/fn/product-controller/create-product';
import {KeycloakService} from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  productName: string = '';
  brandName: string = '';
  description: string = '';
  price: number = 0;
  startingPrice: number = 0;
  quantity: number = 0;
  productImageUrl: string = '';
  selectedColor: string = '';
  colors: string[] = ['Red', 'Blue', 'Black', 'White', 'Pink', 'Gray', 'Green'];
  selectedSize: string = '';
  sizes: string[] = ['Small', 'Medium', 'Large'];
  category: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys & Games'];
  keycloakService = inject(KeycloakService);
  constructor(private productService: ProductControllerService, private router: Router) { }


  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const token = await this.keycloakService.getToken();
    const username = await this.keycloakService.getUsernameFromToken();

    if (!token || !username) {
      console.error('Missing token or username');
      await this.keycloakService.login();
      return;
    }
    const newItem: CreateProduct$Params = {
      Authorization: `Bearer ${token}`,
      'X-Username': 'username',
      body: {
        productName: this.productName,
        brandName: this.brandName,
        description: this.description,
        buyNowPrice: this.price,
        startingPrice: this.startingPrice,
        quantity: this.quantity,
        productImageUrl: this.productImageUrl,
        colour: this.selectedColor,
        productSize: this.selectedSize,
        categoryId: this.categories.indexOf(this.category) + 1, // Example mapping category to ID
        isAvailableForBuyNow: true,
        isSold: false
      }
    };

    this.productService.createProduct(newItem).subscribe(response => {
      console.log('Product created:', response);
      this.router.navigate(['/items-on-sale']);
    }, error => {
      console.error('Error creating product:', error);
    });
  }
}
/*
import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductControllerService } from '../../services/product/services/product-controller.service';
import { CreateProduct$Params } from '../../services/product/fn/product-controller/create-product';
import {KeycloakService} from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  productName: string = '';
  description: string = '';
  price: number = 0;
  selectedColor: string = '';
  colors: string[] = ['Red', 'Blue', 'Black', 'White', 'Pink', 'Gray', 'Green'];
  selectedSize: string = '';
  sizes: string[] = ['Small', 'Medium', 'Large'];
  category: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys & Games'];
  quantity: number = 0;

  keycloakService = inject(KeycloakService);

  constructor(private productService: ProductControllerService, private router: Router) { }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const token = await this.keycloakService.getToken();
    const username = await this.keycloakService.getUsernameFromToken();

    if (!token || !username) {
      console.error('Missing token or username');
      await this.keycloakService.login();
      return;
    }
    const newItem: CreateProduct$Params = {
      Authorization: `Bearer ${token}`,
      'X-Username': 'username',
      body: {
        productName: this.productName,
        description: this.description,
        buyNowPrice: this.price,
        quantity: this.quantity,
        colour: this.selectedColor,
        productSize: this.selectedSize,
        categoryId: this.categories.indexOf(this.category) + 1, // Example mapping category to ID
        isAvailableForBuyNow: true,
        isSold: false
      }
    };

    this.productService.createProduct(newItem).subscribe(response => {
      console.log('Product created:', response);
      this.router.navigate(['/items-on-sale']);
    }, error => {
      console.error('Error creating product:', error);
    });
  }
}
*/
/*
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ProductControllerService} from '../../services/product/services/product-controller.service';
import {CreateProduct$Params} from '../../services/product/fn/product-controller/create-product';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  productName: string = '';
  description: string = '';
  price: number = 0;
  color: string[] = ['Red', 'Blue', 'Black', 'White', 'Pink', 'Gray', 'Green'];
  category: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys & Games'];
  size: string[] = ['Small', 'Medium', 'Large'];

  constructor(private productService: ProductControllerService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    const newItem: CreateProduct$Params = {
      Authorization: 'Bearer token',
      'X-Username': 'username',
      body: {
        productName: this.productName,
        description: this.description,
        buyNowPrice: this.price,
        colour: this.color,
        productSize: this.size,
        categoryId: this.categories.indexOf(this.category) + 1, // Example mapping category to ID
        isAvailableForBuyNow: true,
        isSold: false
      }
    };

    this.productService.createProduct(newItem).subscribe(response => {
      console.log('Product created:', response);
      this.router.navigate(['/items-on-sale']);
    }, error => {
      console.error('Error creating product:', error);
    });
  }
}
*/
