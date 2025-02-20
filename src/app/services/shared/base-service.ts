import { HttpClient } from '@angular/common/http';
import {ApiConfiguration} from './api-configuration';

export class BaseService {
  constructor(protected config: ApiConfiguration, protected http: HttpClient) {}

  get rootUrl(): string {
    return this.config.rootUrl;
  }
}
