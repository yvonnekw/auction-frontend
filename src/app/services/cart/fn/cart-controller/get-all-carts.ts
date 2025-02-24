/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartResponse } from '../../models/cart-response';

export interface GetAllCarts$Params {
}

export function getAllCarts(http: HttpClient, rootUrl: string, params?: GetAllCarts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllCarts.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CartResponse>>;
    })
  );
}

getAllCarts.PATH = '/api/v1/carts/get-all-carts';
