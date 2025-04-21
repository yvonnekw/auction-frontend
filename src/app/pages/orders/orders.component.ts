import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {OrderResponse} from '../../services/order/models/order-response';
import {OrderControllerService} from '../../services/order/services/order-controller.service';
import {FindOrdersByUsername$Params} from '../../services/order/fn/order-controller/find-orders-by-username';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse[] = [];

  orderControllerService = inject(OrderControllerService);

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchOrdersByUsername()
  }

  private async fetchOrdersByUsername(): Promise<void> {
    try {
      const token = await this.keycloakService.getToken();
      const username = await this.keycloakService.getUsernameFromToken();

      if (!token || !username) {
        console.error('Missing token or username');
        await this.keycloakService.login();
        return;
      }

      const idempotencyKey = uuidv4();
      // Ensure you're passing the correct params to findOrdersByUsername
      const params: FindOrdersByUsername$Params = {
        Authorization: `Bearer ${token}`,
        'X-Username': username,
      };

      this.orderControllerService.findOrdersByUsername(params).subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        }
      });

    } catch (error) {
      console.error('Failed to fetch token or username:', error);
    }
  }
}
