import { Component, OnInit } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  buyNow: boolean;
  auction: boolean;
}

@Component({
  selector: 'app-auction-page',
  standalone: true,
  imports: [ NgIf, NgFor, RouterOutlet],
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.scss']
})
export class AuctionPageComponent implements OnInit {
  products: Product[] = [];

  ngOnInit(): void {
    // Sample data for demonstration
    this.products = [
      {
        id: 1,
        name: 'Antique Vase',
        description: 'A beautiful antique vase from the 19th century.',
        price: 150,
        buyNow: true,
        auction: true
      },
      {
        id: 2,
        name: 'Vintage Watch',
        description: 'A classic vintage watch in excellent condition.',
        price: 300,
        buyNow: true,
        auction: false
      },
      {
        id: 3,
        name: 'Art Deco Lamp',
        description: 'An exquisite lamp with an art deco design.',
        price: 120,
        buyNow: false,
        auction: true
      },
      {
        id: 4,
        name: 'Modern Painting',
        description: 'A stunning modern painting from a local artist.',
        price: 200,
        buyNow: true,
        auction: true
      },
      {
        id: 5,
        name: 'Handcrafted Necklace',
        description: 'A unique handcrafted necklace made from fine materials.',
        price: 75,
        buyNow: false,
        auction: false
      },
    ];
  }

  submitBid(product: Product): void {
    alert(`Bid submitted for ${product.name} at price ${product.price}`);
    // Implement bid submission logic here
  }

  buyNow(product: Product): void {
    alert(`Product ${product.name} purchased at price ${product.price}`);
    // Implement purchase logic here
  }
}
