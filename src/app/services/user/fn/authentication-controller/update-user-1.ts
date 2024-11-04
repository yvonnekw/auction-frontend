/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UsersRequest } from '../../models/users-request';
import { UsersResponse } from '../../models/users-response';

export interface UpdateUser1$Params {
      body: UsersRequest
}

export function updateUser1(http: HttpClient, rootUrl: string, params: UpdateUser1$Params, context?: HttpContext): Observable<StrictHttpResponse<UsersResponse>> {
  const rb = new RequestBuilder(rootUrl, updateUser1.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UsersResponse>;
    })
  );
}

updateUser1.PATH = '/api/v1/auth/update-user';