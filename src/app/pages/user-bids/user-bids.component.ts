import {Component, inject} from '@angular/core';
import {BidControllerService} from '../../services/product/services/bid-controller.service';
import {Bid} from '../../services/product/models/bid';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {GetBidsForUser$Params} from '../../services/product/fn/bid-controller/get-bids-for-user';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-bids',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './user-bids.component.html',
  styleUrl: './user-bids.component.scss'
})
export class UserBidsComponent {
  bids: Bid[] = [];
  loading = true;
  error: string | null = null;

  bidService =  inject(BidControllerService)
  router = inject(Router)
  keycloakService = inject(KeycloakService)

  constructor() {}

  async ngOnInit(): Promise<void> {


    const token = await this.keycloakService.getToken();
    const username = await this.keycloakService.getUsernameFromToken();

    if (!token || !username) {
      console.error('Missing token or username');
      await this.keycloakService.login();
      return;
    }

    const params: GetBidsForUser$Params = {
      'Authorization': `Bearer ${token}`,
      'X-Username': username,
    }
    this.bidService.getBidsForUser(params).subscribe(
      (data) => {
        this.bids = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to fetch bids';
        this.loading = false;
      }
    );
  }

}
