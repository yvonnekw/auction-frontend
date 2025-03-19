import {Component, inject} from '@angular/core';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userProfile: any;
  private router =  inject(Router)
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.userProfile = this.keycloakService.getUserProfileData();
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

}
