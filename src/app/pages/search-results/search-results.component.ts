import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  query: string = '';
  products: any[] = []; // Assume this will be populated from a service

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the query parameter from the URL
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.searchProducts();
    });
  }

  searchProducts(): void {
    // Logic to fetch search results based on this.query
    console.log('Searching for:', this.query);
    // Example: Fetch products from your API
    // this.productService.searchProducts(this.query).subscribe(results => {
    //   this.products = results;
    // });
  }

}
