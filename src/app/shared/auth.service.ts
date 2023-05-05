import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMessageComponent } from '../components/dialog-message/dialog-message.component';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;
  isAuthenticated$: Observable<firebase.User>;

  constructor(private fireauth: AngularFireAuth, private router: Router, private dialog: MatDialog) {
    this.fireauth.authState.subscribe(user => {
      this.user = user;
      this.isAuthenticated$ = this.fireauth.authState;
    })
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/movies']);
    }, err => {
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: err.message
        }
      });
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: 'Registration Successful'
        }
      });
      this.router.navigate(['/login']);
    }, err => {
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: err.message
        }
      });
      this.router.navigate(['/register']);
    });
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: err.message
        }
      });
    });
  }

  changePassword(currentPassword: string, newPassword: string) {
    this.reauthenticate(currentPassword).then(() => {
      let user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        this.router.navigate(['/movies']);
      }).catch((err) => {
        this.dialog.open(DialogMessageComponent, {
          data: {
            message: err.message
          }
        });
      }).catch((err) => {
        this.dialog.open(DialogMessageComponent, {
          data: {
            message: err.message
          }
        });
      });
    });
  }

  reauthenticate(currentPassword) {
    let user = firebase.auth().currentUser;
    let cred = firebase.auth.EmailAuthProvider.credential(this.user.email, currentPassword);

    return user.reauthenticateWithCredential(cred)
  }

  getUser() {
    return this.user;
  }

  getUserIdObservable(): Observable<string> {
    return this.fireauth.authState.pipe(
      map(user => user.uid)
    );
  }
}

