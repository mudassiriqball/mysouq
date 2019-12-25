import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../sdk/core/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../sdk/custom/user.service';
import { NavController, Events } from '@ionic/angular';

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
  ) { }
  loginForm: FormGroup;
  loading = false;

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
    const loginData = this.loginForm.value;
    console.log('loginData', loginData);
    // we need to send this data to our node.js server
    this.userService.userLogin(loginData).subscribe(
      data => {
        this.loading = false;
        this.authService.saveTokenToStorage(data.token);
        // this.router.navigateByUrl('/vender-dashbord');
        // this.appComponent.checkLogin();
        this.events.publish('loggedin', { key: 'true' });
        this.navController.navigateRoot('/home');
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }
}
