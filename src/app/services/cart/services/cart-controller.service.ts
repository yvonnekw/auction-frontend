/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addItemToCart } from '../fn/cart-controller/add-item-to-cart';
import { AddItemToCart$Params } from '../fn/cart-controller/add-item-to-cart';
import { Cart } from '../models/cart';
import { CartResponse } from '../models/cart-response';
import { clearCart } from '../fn/cart-controller/clear-cart';
import { ClearCart$Params } from '../fn/cart-controller/clear-cart';
import { getAllCarts } from '../fn/cart-controller/get-all-carts';
import { GetAllCarts$Params } from '../fn/cart-controller/get-all-carts';
import { getCart } from '../fn/cart-controller/get-cart';
import { GetCart$Params } from '../fn/cart-controller/get-cart';
import { getCart1 } from '../fn/cart-controller/get-cart-1';
import { GetCart1$Params } from '../fn/cart-controller/get-cart-1';
import { getCartItems } from '../fn/cart-controller/get-cart-items';
import { GetCartItems$Params } from '../fn/cart-controller/get-cart-items';
import { removeItem } from '../fn/cart-controller/remove-item';
import { RemoveItem$Params } from '../fn/cart-controller/remove-item';
import { updateCart } from '../fn/cart-controller/update-cart';
import { UpdateCart$Params } from '../fn/cart-controller/update-cart';

@Injectable({ providedIn: 'root' })
export class CartControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateCart()` */
  static readonly UpdateCartPath = '/api/v1/carts/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCart$Response(params: UpdateCart$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCart(params: UpdateCart$Params, context?: HttpContext): Observable<void> {
    return this.updateCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addItemToCart()` */
  static readonly AddItemToCartPath = '/api/v1/carts/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addItemToCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addItemToCart$Response(params: AddItemToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addItemToCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addItemToCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addItemToCart(params: AddItemToCart$Params, context?: HttpContext): Observable<{
}> {
    return this.addItemToCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getCart()` */
  static readonly GetCartPath = '/api/v1/carts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Response(params?: GetCart$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart(params?: GetCart$Params, context?: HttpContext): Observable<string> {
    return this.getCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getCartItems()` */
  static readonly GetCartItemsPath = '/api/v1/carts/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartItems$Response(params: GetCartItems$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
    return getCartItems(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartItems(params: GetCartItems$Params, context?: HttpContext): Observable<Cart> {
    return this.getCartItems$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cart>): Cart => r.body)
    );
  }

  /** Path part for operation `getCart1()` */
  static readonly GetCart1Path = '/api/v1/carts/get-user-cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart1$Response(params: GetCart1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getCart1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCart1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart1(params: GetCart1$Params, context?: HttpContext): Observable<{
}> {
    return this.getCart1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllCarts()` */
  static readonly GetAllCartsPath = '/api/v1/carts/get-all-carts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCarts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCarts$Response(params?: GetAllCarts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartResponse>>> {
    return getAllCarts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCarts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCarts(params?: GetAllCarts$Params, context?: HttpContext): Observable<Array<CartResponse>> {
    return this.getAllCarts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CartResponse>>): Array<CartResponse> => r.body)
    );
  }

  /** Path part for operation `removeItem()` */
  static readonly RemoveItemPath = '/api/v1/carts/items/{itemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeItem$Response(params: RemoveItem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeItem(params: RemoveItem$Params, context?: HttpContext): Observable<void> {
    return this.removeItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `clearCart()` */
  static readonly ClearCartPath = '/api/v1/carts/clear-cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clearCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  clearCart$Response(params: ClearCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return clearCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clearCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clearCart(params: ClearCart$Params, context?: HttpContext): Observable<{
}> {
    return this.clearCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
