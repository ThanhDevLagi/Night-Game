import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private url = "http://localhost:5000/api/users";
  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

    login(email: string, password: string): Observable<any> {
      return this.http.get(`${this.url}?email=${email}&password=${password}`);
    }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url}?email=${email}`);
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  register(body: any): Observable<any> {
    body.veryEmail = body.email;
    body.role = 1;
    body.img = "default.jpg";
    return this.http.post(this.url, body);
  }

  CheckEmailExits(email: string): Observable<any> {
    return this.http.get(`${this.url}?email=${encodeURIComponent(email)}`);
  }


}
