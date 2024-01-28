import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { UserSession } from '../models/UserSession';

@Injectable({
    providedIn: 'root'
  })
  export class SessionStorageService {
  
    constructor() { }
  
        saveUser(user: UserSession): void {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
                console.error('sessionStorage is not available.');
      }
    }
  
        getUser(): UserSession | null {
      if (typeof sessionStorage !== 'undefined') {
        const userData = sessionStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
      } else {
                console.error('sessionStorage is not available.');
        return null;
      }
    }
  
        clearUser(): void {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('user');
      } else {
                console.error('sessionStorage is not available.');
      }
    }
  }
  
