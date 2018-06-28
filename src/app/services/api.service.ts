import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiEndpoint: string = environment.API_ROOT;
  authToken!: string;
  constructor(private http: HttpClient, private auth: AuthService) { }


  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  login(credentials) {
    console.log(credentials);
    return this.http.post(this.apiEndpoint + '/auth', credentials)
    .pipe(
      tap((results: any) => this.auth.setToken(results.token)),
      catchError((err, caught) => {
        console.error(err);
        return of({});
      })
    );
  }

  createUser(user) {
    return this.http.post(this.apiEndpoint + '/user', user)
    .pipe(
      tap((results: any) => this.auth.setToken(results.token)),
      catchError((err, caught) => {
        console.error(err);
        return of({});
      })
    );
  }

  public getLists() {
    return this.http.get(this.apiEndpoint + '/list');
  }

  public getListDetails(id): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiEndpoint}/list/${id}/details`);
  }

  public updateListDetail(listId, listDetailId, listDetail) {
    return this.http.put(`${this.apiEndpoint}/list/${listId}/detail/${listDetailId}`, listDetail);
  }

  public addListDetail(listId, item) {
    return this.http.post(`${this.apiEndpoint}/list/${listId}/detail`, item);
  }

  public deleteListDetail(listId, item) {
    return this.http.delete(`${this.apiEndpoint}/list/${listId}/detail/${item.id}`);
  }

  public createList(list) {
    return this.http.post<any>(`${this.apiEndpoint}/list`, list);
  }

}
