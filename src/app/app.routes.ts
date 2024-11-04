import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { BuyNowComponent } from './pages/buy-now/buy-now.component';
import { SubmitBidComponent } from './pages/submit-bid/submit-bid.component';
import { AuthGuard } from './services/guard/auth.guard';
import {LoginComponent} from './pages/login/login.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'buy-now',
    component: BuyNowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'submit-bid',
    component: SubmitBidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
];
