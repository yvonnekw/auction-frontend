import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  router = inject(Router)

}
