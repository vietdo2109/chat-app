import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const URL = 'https://api.artic.edu/api/v1/artworks';
@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(private http: HttpClient) {}

  getArt(): Observable<any> {
    return this.http.get(URL);
  }
}
