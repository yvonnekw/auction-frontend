import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {OrderResponse} from '../../services/order/models/order-response';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse[] = [];

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
  //  this.fetchOrders();
  }

  /*
  private async fetchOrders(): Promise<void> {
    const token = await this.keycloakService.getToken();
    const username = await this.keycloakService.getUsernameFromToken();
    this.http.get<Order[]>(`/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        //'X-Username': username,
      }
    }).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }*/
}
