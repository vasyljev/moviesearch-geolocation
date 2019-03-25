import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }
  setUserState() {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        return user;
      }
      else {
      }
    });
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginEmailPassword(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(`${errorCode}: ${errorMessage}`);
    });
  }
  signUp(email: string, password: string, name: string) {
    if (!email || !password || !name) {
      console.log('enter date');
    }
    else {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(`${errorCode}: ${errorMessage}`);
      }).then(() => {
        var user = this.afAuth.auth.currentUser;
        user ? user.updateProfile({
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
          console.log('Error', error);
        }) : console.log('empty user');
      });
    }
  }
  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut();
  }
}
