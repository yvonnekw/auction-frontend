import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  product = {
    name: '',
    description: '',
    price: null,
    category: ''
  };

   categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys'];

    onSubmit() {
      console.log('Product submitted:', this.product);
    }

}
