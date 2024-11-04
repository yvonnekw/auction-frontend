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

import { findAllByOrderId } from '../fn/order-line-controller/find-all-by-order-id';
import { FindAllByOrderId$Params } from '../fn/order-line-controller/find-all-by-order-id';
import { OrderLineResponse } from '../models/order-line-response';

@Injectable({ providedIn: 'root' })
export class OrderLineControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllByOrderId()` */
  static readonly FindAllByOrderIdPath = '/api/v1/order-lines/order/{order-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllByOrderId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllByOrderId$Response(params: FindAllByOrderId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderLineResponse>>> {
    return findAllByOrderId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllByOrderId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllByOrderId(params: FindAllByOrderId$Params, context?: HttpContext): Observable<Array<OrderLineResponse>> {
    return this.findAllByOrderId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderLineResponse>>): Array<OrderLineResponse> => r.body)
    );
  }

}