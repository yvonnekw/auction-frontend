import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProxyService {
  private proxyUrl = 'https://your-proxy-server.com/proxy?url=';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getImageUrl(imageUrl: string): Observable<SafeUrl> {
    return this.http.get(this.proxyUrl + encodeURIComponent(imageUrl), { responseType: 'blob' }).pipe(
      map(blob => {
        const objectUrl = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
    );
  }
}
