import { Injectable, Inject, Optional } from '@angular/core';
import { InjectionToken } from '@angular/core';

// Create an injection token for the service name
export const SERVICE_NAME_TOKEN = new InjectionToken<string>('serviceName');

@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  // Base URL for the gateway
  private gatewayUrl: string = 'http://localhost:8222'; // Update to your gateway URL

  // Define service URLs for various services, routed through the gateway
  private serviceUrls: { [key: string]: string } = {
    addressService: `${this.gatewayUrl}/api/v1/addresses`, // Assuming the microservice path
    orderService: `${this.gatewayUrl}/api/v1/orders`,
    paymentService: `${this.gatewayUrl}/api/v1/payments`,
    invoiceService: `${this.gatewayUrl}/api/v1/payments`,
    productService: `${this.gatewayUrl}/api/v1/products`,
    userService: `${this.gatewayUrl}/api/v1/users`,
  };

  // The currently active root URL
  rootUrl: string;

  // Inject the service name using the injection token
  constructor(@Optional() @Inject(SERVICE_NAME_TOKEN) serviceName: string = 'productService') {
    // Initialize rootUrl to the specified service or default to productService
    this.rootUrl = this.serviceUrls[serviceName] || this.serviceUrls['productService'];
  }

  // Other methods...
  setService(serviceName: string): void {
    if (this.serviceUrls[serviceName]) {
      this.rootUrl = this.serviceUrls[serviceName];
    } else {
      console.warn(`Service "${serviceName}" not found. Defaulting to productService.`);
      this.rootUrl = this.serviceUrls['productService']; // Fallback to productService
    }
  }

  getRootUrl(): string {
    return this.rootUrl;
  }

}

export interface ApiConfigurationParams {
  rootUrl?: string;
}
