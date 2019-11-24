import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() {
    this.code_sended = false;
   }
  code_sended: boolean;

  ngOnInit() {
  }

  onSendCodeClick() {
    this.code_sended = true;
  }

  onSignupBtnClick() {
    
  }
}
