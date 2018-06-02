import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiEndpoint: string = environment.API_ROOT;
  authToken!: string;
  constructor(private http: HttpClient) { }


  login(credentials) {
    return this.http.post(this.apiEndpoint + '/auth', credentials)
    .pipe(
      tap((results: any) => this.authToken = results && results.token),
    );
  }

  verifyAuthToken() {
    return this.authorizedGet('/user');
  }

  private authorizedPost(url: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': this.authToken})
    };
    return this.http.post(this.apiEndpoint + url, data, httpOptions);
  }

  private authorizedGet(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `JWT ${this.authToken}`})
    };
    console.log(httpOptions);
    return this.http.get(this.apiEndpoint + url, httpOptions);
  }

}
