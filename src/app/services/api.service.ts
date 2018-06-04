import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiEndpoint: string = environment.API_ROOT;
  authToken!: string;
  constructor(private http: HttpClient) { }


  isLoggedIn() {
    return !!this.authToken;
  }

  login(credentials) {
    return this.http.post(this.apiEndpoint + '/auth', credentials)
    .pipe(
      tap((results: any) => this.authToken = results && results.token),
    );
  }

  verifyAuthToken(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        this.authorizedGet('/auth/verify')
        .subscribe(
          (response) => {
            if (response === true) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (err) => resolve(false),
        );
      }
    );
  }

  private authorizedPost(url: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': this.authToken})
    };
    return this.http.post(this.apiEndpoint + url, data, httpOptions);
  }

  private authorizedGet(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.authToken}`})
    };
    console.log(httpOptions);
    return this.http.get(this.apiEndpoint + url, httpOptions);
  }

}
