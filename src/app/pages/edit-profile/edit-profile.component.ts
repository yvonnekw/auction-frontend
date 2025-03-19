import {Component, inject} from '@angular/core';
import {UserProfile} from '../../services/keycloak/user-profile';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  userProfile: UserProfile | null = null;

  private keycloakService = inject(KeycloakService)
  private router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    this.userProfile = this.keycloakService.getUserProfileData();
  }

  saveProfile(): void {

    console.log('Profile saved:', this.userProfile);
    this.router.navigate(['/profile']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

}
