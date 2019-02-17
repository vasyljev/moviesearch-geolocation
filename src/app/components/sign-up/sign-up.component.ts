import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor( private login: LoginService) { }

  ngOnInit() {
  }

  signUp(email: string, password: string, name: string) {
    this.login.signUp(email, password, name);
  }

}
