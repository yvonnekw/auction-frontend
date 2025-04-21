import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProductDetailComponent} from './pages/product-detail/product-detail.component';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {AuctionPageComponent} from './pages/auction-page/auction-page.component';
import {SubmitBidComponent} from './pages/submit-bid/submit-bid.component';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {NavbarComponent} from './pages/navbar/navbar.component';
import {HttpClientJsonpModule} from '@angular/common/http';
import {OrdersComponent} from './pages/orders/orders.component';
import {SellingComponent} from './pages/selling/selling.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    AuctionPageComponent,
    RouterOutlet,
    SubmitBidComponent,
    RouterLink,
    RouterLinkActive,
    CreateProductComponent,
    NavbarComponent,
    SubmitBidComponent,
    RouterLink,
    RouterLinkActive,
    HttpClientJsonpModule,
    OrdersComponent,
  SellingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auction-frontend';
}

