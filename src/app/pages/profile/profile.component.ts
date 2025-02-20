import { Component } from '@angular/core';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {CommonModule, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userProfile: any;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.userProfile = this.keycloakService.getUserProfileData();
  }

}
