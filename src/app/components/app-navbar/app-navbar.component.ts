import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {
  showNavbar: boolean = false;

  constructor(private auth: AuthService) { }

  toggleNavbar(): void {
    this.showNavbar = !this.showNavbar;
  }

  logout(): void {
    this.auth.logout();
  }

  getUser(): firebase.User {
    return this.auth.getUser();
  }
}
