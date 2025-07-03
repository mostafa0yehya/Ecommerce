import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userToken');

      this.isLoggedIn.next(!!token);
    }
  }

  isLoggedIn = new BehaviorSubject<boolean>(false);

  signUp(registerObj: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registerObj
    );
  }
  login(user: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      user
    );
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.isLoggedIn.next(false);
  }
}
