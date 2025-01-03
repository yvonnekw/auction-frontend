/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../../shared/api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteUserByUserId1 } from '../fn/authentication-controller/delete-user-by-user-id-1';
import { DeleteUserByUserId1$Params } from '../fn/authentication-controller/delete-user-by-user-id-1';
import { existByUserId1 } from '../fn/authentication-controller/exist-by-user-id-1';
import { ExistByUserId1$Params } from '../fn/authentication-controller/exist-by-user-id-1';
import { findUserByUserId1 } from '../fn/authentication-controller/find-user-by-user-id-1';
import { FindUserByUserId1$Params } from '../fn/authentication-controller/find-user-by-user-id-1';
import { getUsers1 } from '../fn/authentication-controller/get-users-1';
import { GetUsers1$Params } from '../fn/authentication-controller/get-users-1';
import { registerUser1 } from '../fn/authentication-controller/register-user-1';
import { RegisterUser1$Params } from '../fn/authentication-controller/register-user-1';
import { updateUser1 } from '../fn/authentication-controller/update-user-1';
import { UpdateUser1$Params } from '../fn/authentication-controller/update-user-1';
import { UsersResponse } from '../models/users-response';

@Injectable({ providedIn: 'root' })
export class AuthenticationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUser1()` */
  static readonly UpdateUser1Path = '/api/v1/auth/update-user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser1$Response(params: UpdateUser1$Params, context?: HttpContext): Observable<StrictHttpResponse<UsersResponse>> {
    return updateUser1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser1(params: UpdateUser1$Params, context?: HttpContext): Observable<UsersResponse> {
    return this.updateUser1$Response(params, context).pipe(
      map((r: StrictHttpResponse<UsersResponse>): UsersResponse => r.body)
    );
  }

  /** Path part for operation `registerUser1()` */
  static readonly RegisterUser1Path = '/api/v1/auth/create-user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser1$Response(params: RegisterUser1$Params, context?: HttpContext): Observable<StrictHttpResponse<UsersResponse>> {
    return registerUser1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser1(params: RegisterUser1$Params, context?: HttpContext): Observable<UsersResponse> {
    return this.registerUser1$Response(params, context).pipe(
      map((r: StrictHttpResponse<UsersResponse>): UsersResponse => r.body)
    );
  }

  /** Path part for operation `findUserByUserId1()` */
  static readonly FindUserByUserId1Path = '/api/v1/auth/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserByUserId1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserByUserId1$Response(params: FindUserByUserId1$Params, context?: HttpContext): Observable<StrictHttpResponse<UsersResponse>> {
    return findUserByUserId1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserByUserId1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserByUserId1(params: FindUserByUserId1$Params, context?: HttpContext): Observable<UsersResponse> {
    return this.findUserByUserId1$Response(params, context).pipe(
      map((r: StrictHttpResponse<UsersResponse>): UsersResponse => r.body)
    );
  }

  /** Path part for operation `deleteUserByUserId1()` */
  static readonly DeleteUserByUserId1Path = '/api/v1/auth/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserByUserId1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserByUserId1$Response(params: DeleteUserByUserId1$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUserByUserId1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserByUserId1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserByUserId1(params: DeleteUserByUserId1$Params, context?: HttpContext): Observable<void> {
    return this.deleteUserByUserId1$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `existByUserId1()` */
  static readonly ExistByUserId1Path = '/api/v1/auth/exits/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `existByUserId1()` instead.
   *
   * This method doesn't expect any request body.
   */
  existByUserId1$Response(params: ExistByUserId1$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return existByUserId1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `existByUserId1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  existByUserId1(params: ExistByUserId1$Params, context?: HttpContext): Observable<boolean> {
    return this.existByUserId1$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getUsers1()` */
  static readonly GetUsers1Path = '/api/v1/auth/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers1$Response(params?: GetUsers1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getUsers1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsers1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers1(params?: GetUsers1$Params, context?: HttpContext): Observable<string> {
    return this.getUsers1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
