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

import { Bid } from '../models/bid';
import { BidResponse } from '../models/bid-response';
import { getAllProducts1 } from '../fn/bid-controller/get-all-products-1';
import { GetAllProducts1$Params } from '../fn/bid-controller/get-all-products-1';
import { getBids } from '../fn/bid-controller/get-bids';
import { GetBids$Params } from '../fn/bid-controller/get-bids';
import { getBidsForProduct } from '../fn/bid-controller/get-bids-for-product';
import { GetBidsForProduct$Params } from '../fn/bid-controller/get-bids-for-product';
import { getBidsForUser } from '../fn/bid-controller/get-bids-for-user';
import { GetBidsForUser$Params } from '../fn/bid-controller/get-bids-for-user';
import { submitBid } from '../fn/bid-controller/submit-bid';
import { SubmitBid$Params } from '../fn/bid-controller/submit-bid';

@Injectable({ providedIn: 'root' })
export class BidControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `submitBid()` */
  static readonly SubmitBidPath = '/api/v1/bids/submit-bid';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `submitBid()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitBid$Response(params: SubmitBid$Params, context?: HttpContext): Observable<StrictHttpResponse<BidResponse>> {
    return submitBid(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `submitBid$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitBid(params: SubmitBid$Params, context?: HttpContext): Observable<BidResponse> {
    return this.submitBid$Response(params, context).pipe(
      map((r: StrictHttpResponse<BidResponse>): BidResponse => r.body)
    );
  }

  /** Path part for operation `getBids()` */
  static readonly GetBidsPath = '/api/v1/bids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBids()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBids$Response(params?: GetBids$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getBids(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBids$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBids(params?: GetBids$Params, context?: HttpContext): Observable<string> {
    return this.getBids$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getBidsForUser()` */
  static readonly GetBidsForUserPath = '/api/v1/bids/get-bids-for-user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBidsForUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBidsForUser$Response(params: GetBidsForUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BidResponse>>> {
    return getBidsForUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBidsForUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBidsForUser(params: GetBidsForUser$Params, context?: HttpContext): Observable<Array<BidResponse>> {
    return this.getBidsForUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BidResponse>>): Array<BidResponse> => r.body)
    );
  }

  /** Path part for operation `getBidsForProduct()` */
  static readonly GetBidsForProductPath = '/api/v1/bids/get-bids-for-product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBidsForProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBidsForProduct$Response(params: GetBidsForProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Bid>>> {
    return getBidsForProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBidsForProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBidsForProduct(params: GetBidsForProduct$Params, context?: HttpContext): Observable<Array<Bid>> {
    return this.getBidsForProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Bid>>): Array<Bid> => r.body)
    );
  }

  /** Path part for operation `getAllProducts1()` */
  static readonly GetAllProducts1Path = '/api/v1/bids/get-all-bids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProducts1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts1$Response(params: GetAllProducts1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BidResponse>>> {
    return getAllProducts1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProducts1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts1(params: GetAllProducts1$Params, context?: HttpContext): Observable<Array<BidResponse>> {
    return this.getAllProducts1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BidResponse>>): Array<BidResponse> => r.body)
    );
  }

}
