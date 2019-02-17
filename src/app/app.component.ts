import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vasyljev-project';

  visValue: boolean = true;
  actualUser: any;

  constructor(private login: LoginService,
    private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.actualUser = this.login.setUserState();
  }

  loginG() {
   this.login.loginGoogle();    
  }

  loginUser(email: string, password: string) {
    this.login.loginEmailPassword(email, password);
  }

  signUp(email: string, password: string, name: string) {
    this.login.signUp(email, password, name);
  }
  
  logout() {
    this.login.logout();
  }

  toogleVis() {
    return this.visValue = !this.visValue;
  }
}
