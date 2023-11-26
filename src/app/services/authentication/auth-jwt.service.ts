import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthJwtService {
  constructor(private http: HttpClient) {}
  
  private login_url = 'http://localhost:5000/login';
  private register_url = 'http://localhost:5000/register';

  register(user: any): Observable<any> {
    return this.http.post(this.register_url, user);
  }

  login(user: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.login_url, user).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}