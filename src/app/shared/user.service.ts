import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(this.baseUrl + 'users');
  }
  public createUser(data: object) {
    return this.http.post(this.baseUrl + 'users', data);
  }
  public getUser(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'users/' + id);
  }
  public updateUser(id: number, data: object) {
    return this.http.patch<any>(this.baseUrl + 'users/' + id, data);
  }
}
