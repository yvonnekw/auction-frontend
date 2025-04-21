import { Injectable, Inject, Optional } from '@angular/core';
import { InjectionToken } from '@angular/core';


export const SERVICE_NAME_TOKEN = new InjectionToken<string>('serviceName');

@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  private gatewayUrl: string = 'http://localhost:8222';

  private serviceUrls: { [key: string]: string } = {
    addressService: `${this.gatewayUrl}/api/v1/addresses`,
    orderService: `${this.gatewayUrl}/api/v1/orders`,
    paymentService: `${this.gatewayUrl}/api/v1/payments`,
    invoiceService: `${this.gatewayUrl}/api/v1/payments`,
    productService: `${this.gatewayUrl}/api/v1/products`,
    userService: `${this.gatewayUrl}/api/v1/users`,
  };

  rootUrl: string;

  constructor(@Optional() @Inject(SERVICE_NAME_TOKEN) serviceName: string = 'productService') {
    this.rootUrl = this.serviceUrls[serviceName] || this.serviceUrls['productService'];
  }

  setService(serviceName: string): void {
    if (this.serviceUrls[serviceName]) {
      this.rootUrl = this.serviceUrls[serviceName];
    } else {
      console.warn(`Service "${serviceName}" not found. Defaulting to productService.`);
      this.rootUrl = this.serviceUrls['productService'];
    }
  }

  getRootUrl(): string {
    return this.rootUrl;
  }

}

export interface ApiConfigurationParams {
  rootUrl?: string;
}
