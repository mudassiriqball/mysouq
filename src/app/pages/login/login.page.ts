import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../sdk/core/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../sdk/custom/user.service';
import { NavController, Events, AlertController } from '@ionic/angular';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private navController: NavController,
    private appComponent: AppComponent,
    public events: Events,
    public alertController: AlertController,
  ) { }
  loginForm: FormGroup;
  loading = false;
  loginError = false;
  errorMsg = "";

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }


  save() {
    this.loading = true;
    const loginData = this.loginForm.value;
    console.log('loginData', loginData);
    // we need to send this data to our node.js server
    this.userService.userLogin(loginData).subscribe(
      data => {
        this.authService.saveTokenToStorage(data.token);
        const decodedToken = decode(data.token);

        this.events.publish('loggedin', decodedToken.data.name);

        this.events.publish('logged', decodedToken.data.role);

        this.loading = false;
        if (decodedToken.data.role != "vender") {
          this.navController.navigateRoot('/home');
        } else {
          this.navController.navigateRoot('/vender-dashbord');
        }
      },
      error => {
        this.loading = false;
        this.loginError = true;
        this.errorMsg = error.error.message;
        console.log('error', error.error.message);
      }
    );
  }
}
