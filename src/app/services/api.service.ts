import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private urlRandomUser: string = 'https://randomuser.me/api';
  urlCataas: string = 'https://cataas.com/cat';

  constructor(private http: HttpClient) { }

  getPeople() {
    return this.http.get(this.urlRandomUser);
  }

  getCat() {
    return this.http.get(this.urlCataas + '?json=true');
  }
}