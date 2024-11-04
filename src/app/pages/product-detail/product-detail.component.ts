import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ NgIf, NgFor],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Get product ID from route params
      // Fetch product details using productId
      console.log(`Fetching details for product ID: ${this.productId}`);
    });
  }

  submitBid(): void {
    console.log(`Submitting bid for product ID: ${this.productId}`);
  }

  buyNow(): void {
    console.log(`Buying product ID: ${this.productId}`);
  }
}
