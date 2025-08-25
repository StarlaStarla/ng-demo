import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = { loggedIn: true, role: 'admin' };
  isLoggedIn() {
    return this.user.loggedIn;
  }
  getRole() {
    return this.user.role;
  }
} 