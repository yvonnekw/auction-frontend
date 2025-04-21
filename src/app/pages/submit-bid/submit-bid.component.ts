import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../services/product/models/product';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { BidRequest } from '../../services/product/models/bid-request';
import { ApiConfiguration } from '../../services/order/api-configuration';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BidControllerService} from '../../services/product/services/bid-controller.service';
import {SubmitBid$Params} from '../../services/product/fn/bid-controller/submit-bid';


@Component({
  selector: 'app-submit-bid',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, CurrencyPipe],
  templateUrl: './submit-bid.component.html',
  styleUrls: ['./submit-bid.component.css']
})
export class SubmitBidComponent implements OnInit {

  productId!: number;
  product!: Product;
  bidAmount!: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private keycloakService: KeycloakService,
    private http: HttpClient,
    private bidControllerService: BidControllerService,
    private apiConfig: ApiConfiguration
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('productId');
      if (id) {
        this.productId = +id;
        this.fetchProductDetails(this.productId);
      } else {
        this.errorMessage = 'Invalid product ID.';
      }
    });
  }

  fetchProductDetails(productId: number): void {
    this.http.get<Product>(`${this.apiConfig.rootUrl}/api/v1/products/${productId}`).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.errorMessage = 'Failed to load product details.';
      },
    });
  }

  async onSubmit(): Promise<void> {
    if (this.bidAmount < this.product.buyNowPrice!) {
      this.errorMessage = `Your bid must be at least ${this.product.buyNowPrice!}.`;
      return;
    }

    const token = await this.keycloakService.getToken();
    const username = await this.keycloakService.getUsernameFromToken();
    console.log(token)

    if (!username) {
      this.errorMessage = 'User is not authenticated';
      return;
    }

    const bidRequest: BidRequest = {
      productId: this.productId,
      bidAmount: this.bidAmount,
    };

    // Use the SubmitBid$Params interface
    const submitBidParams: SubmitBid$Params = {
      'Authorization': `Bearer ${token}`,
      'X-Username': username,
      body: bidRequest
    };

    this.bidControllerService.submitBid(submitBidParams).subscribe({
      next: (response) => { // Handle the response
        console.log('Bid submitted body:', submitBidParams);
        console.log('Bid submitted successfully:', response);
        this.successMessage = `Your bid of ${response.bidAmount} has been submitted successfully!`;
        this.router.navigate(['/bids']);
      },
      error: (error) => {
        console.error('Error submitting bid:', error);
        this.errorMessage = 'Failed to submit your bid. Please try again.';
      },
    });
  }
}



/*
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../services/product/models/product';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {HttpClient} from '@angular/common/http';
import {ApiConfiguration} from '../../services/order/api-configuration';
import {BidRequest} from '../../services/product/models/bid-request';
import {CommonModule, CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-submit-bid',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, CurrencyPipe],
  templateUrl: './submit-bid.component.html',
  styleUrl: './submit-bid.component.css'
})
//export class SubmitBidComponent {
  export class SubmitBidComponent implements OnInit {

  productId!: number;
  product!: Product;
  bidAmount!: number;
  errorMessage: string = '';
  successMessage: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private keycloakService: KeycloakService,
    private http: HttpClient,
    private apiConfig: ApiConfiguration,
  //private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('productId');
      if (id) {
        this.productId = +id;
        this.fetchProductDetails(this.productId);
      } else {
        this.errorMessage = 'Invalid product ID.';
      }
    });
  }

  fetchProductDetails(productId: number): void {
    this.http.get<Product>(`${this.apiConfig.rootUrl}/api/v1/products/${productId}`).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.errorMessage = 'Failed to load product details.';
      },
    });
  }

  async onSubmit(): Promise<void> {

    if (this.bidAmount < this.product.buyNowPrice!) {
      this.errorMessage = `Your bid must be at least ${this.product.buyNowPrice!}.`;
      return;
    }

    //const username = this.keycloakService.getUsernameFromToken();
    const username = await this.keycloakService.getUsernameFromToken();

    if (!username) {
      this.errorMessage = 'User is not authenticated';
      return;
    }

    const bidRequest: BidRequest = {
      productId: this.productId,
      bidAmount: this.bidAmount,
    //  username: username
    };

    this.http
      .post(`${this.apiConfig.rootUrl}/api/v1/bids/submit-bid`, bidRequest, {
        headers: {
          'X-Username': username,
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (response: any) => {
          console.log('Bid submitted successfully:', response);
          this.successMessage = 'Your bid has been submitted successfully!';
          this.router.navigate(['/bids']);
        },
        error: (error) => {
          console.error('Error submitting bid:', error);
          this.errorMessage = 'Failed to submit your bid. Please try again.';
        },
      });
  }
  }

 */
 /*
  productId!: number;
  productName!: string;
  buyNowPrice!: number;
  bidAmount!: number; // User's bid amount

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
      this.productName = params['productName'];
      this.buyNowPrice = params['buyNowPrice'];
    });
  }

  submitBid(): void {
    if (!this.bidAmount || this.bidAmount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    // Logic to submit the bid (e.g., via a service call)
    console.log(`Submitting bid for product ${this.productName}: $${this.bidAmount}`);

    // Navigate back to the home page or show confirmation
    alert('Your bid has been submitted!');
    this.router.navigate(['/home']);
  }

}*/

