import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from "../../services/LoginService";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  @Input () visValue: boolean;
  @Output() setVisValue = new EventEmitter<boolean>();

  constructor( private login: LoginService) { }

  ngOnInit() {
  }

  signUp(email: string, password: string, name: string) {
    this.login.signUp(email, password, name);
  }

  onSetVisValue () {
    this.setVisValue.emit();
  }

}
