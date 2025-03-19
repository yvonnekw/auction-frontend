import {Component, inject} from '@angular/core';
import {ProductResponse} from '../../services/product/models/product-response';
import {ProductControllerService} from '../../services/product/services/product-controller.service';
import {GetProductsForUser$Params} from '../../services/product/fn/product-controller/get-products-for-user';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-items',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './user-items.component.html',
  styleUrl: './user-items.component.scss'
})

export class UserItemsComponent {
  products: ProductResponse[] = [];
  loading = true;
  error: string | null = null;
  keycloakService = inject(KeycloakService)

  productService = inject(ProductControllerService)

  async ngOnInit(): Promise<void> {

    const token = await this.keycloakService.getToken();
    const username = await this.keycloakService.getUsernameFromToken();

    if (!token || !username) {
      console.error('Missing token or username');
      await this.keycloakService.login();
      return;
    }

    const params: GetProductsForUser$Params = {
      'Authorization': `Bearer ${token}`,
      'X-Username': username,
    }
    this.productService.getProductsForUser(params).subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to fetch products';
        this.loading = false;
      }
    );
  }
}
