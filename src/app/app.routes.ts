import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { SubmitBidComponent } from './pages/submit-bid/submit-bid.component';
import { AuthGuard } from './services/guard/auth.guard';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {CartComponent} from './pages/cart/cart.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {SellingComponent} from './pages/selling/selling.component';
import {ListItemComponent} from './pages/list-item/list-item.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {EditProfileComponent} from './pages/edit-profile/edit-profile.component';
import {UserItemsComponent} from './pages/user-items/user-items.component';
import {UserBidsComponent} from './pages/user-bids/user-bids.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'submit-bid/:productId',
    component: SubmitBidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-product',
    component: CreateProductComponent
  },
  {
    path: 'selling',
    component: SellingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-item',
    component: ListItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-items',
    component: UserItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-bids',
    component: UserBidsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent
  },



];
