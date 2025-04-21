import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CartControllerService} from '../../services/cart/services/cart-controller.service';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {GetCartItems$Params} from '../../services/cart/fn/cart-controller/get-cart-items';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  username: string = '';
  cartItemCount: number = 0;
  cartItems: any[] = [];
  subTotal: number = 0;
  showCart: boolean = false;
  loading: boolean = false;
  token: string = '';

  constructor(
    private router: Router,
    private cartControllerService: CartControllerService,
    private keycloakService: KeycloakService
  ) {
  }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = (await this.keycloakService.getUsernameFromToken()) || '';
      this.token = (await this.keycloakService.getToken()) || '';
      this.loadCartItems();
    }
  }

  async loadCartItems(): Promise<void> {
    this.loading = true;
    const params: GetCartItems$Params = {
      'Authorization': `Bearer ${this.token}`,
      'X-Username': this.username
    };

    this.cartControllerService.getCartItems(params).subscribe(
      (data) => {
        this.cartItems = data.items || [];
        this.cartItemCount = this.cartItems.length;
        this.subTotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching cart items', error);
        this.loading = false;
      }
    );
  }

  navigateToProfile(): void {
    const profile = this.keycloakService.getUserProfileData();
    if (profile) {
      console.log(profile);
      this.router.navigate(['/profile']);
    } else {
      console.error('User profile is not available');
    }
  }



  onSearch(): void {
    this.router.navigate(['/search'], {queryParams: {query: this.searchQuery}});
  }

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  removeItem(cartItemId: number): void {
  }
}
