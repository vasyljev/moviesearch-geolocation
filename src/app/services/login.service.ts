import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth,
    public db: AngularFireDatabase) { }

  
    setUserState() {
      this.afAuth.auth.onAuthStateChanged(function(user) {
        if (user) {
          
          console.log('ueser', this.actualUser)
          // User is signed in.
          // var displayName = user.displayName;
          // var email = user.email;
          // var emailVerified = user.emailVerified;
          // var photoURL = user.photoURL;
          // var isAnonymous = user.isAnonymous;
          // var uid = user.uid;
          // var providerData = user.providerData;
          // ...

          return user;
        } else {
          // User is signed out.
          // ...
        }
      });
    }
  
    loginGoogle() {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      
    }
  
    loginEmailPassword (email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
        
      
    }
  
    signUp(email: string, password: string, name: string) {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }).then(
        ()=> {
          var user = this.afAuth.auth.currentUser;
          user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });
          // this.db.list('items').push({ emailV: email,
          //   favorites: []  
          // });
        });  
    }
        
    
  
  
    logout() {
      localStorage.clear();
      this.afAuth.auth.signOut();
    }




}