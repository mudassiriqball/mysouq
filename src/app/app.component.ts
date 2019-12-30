import { async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//  Language service:
import { LanguageService } from './services/language.service';
//  Theme Service:
import { ThemeService } from './services/theme.service';
import { Storage } from '@ionic/storage';
import { AuthService } from './sdk/core/auth.service';
// import { UserService } from './sdk/custom/user.service';
import * as decode from 'jwt-decode';

const defaults = {
  name: 'Default',
  primary: '#5a469c',
  primary_text: '#ffffff',
  background: '#ffffff',
  text: '#5a469c'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user_name: any;
  login: boolean;
  vendor: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: Storage,
    private authService: AuthService,
    public events: Events,
    private navController: NavController,
    // private userService: UserService,
  ) {
    storage.get('theme').then(theme => {
      if (theme == null) {
        this.themeService.setTheme(defaults);
      } else {
        this.themeService.setTheme(theme);
      }
    });
    storage.get('font').then(font => {
      if (font != null) {
        this.themeService.setFont(font);
      } else {
        this.themeService.currFont = 'Default';
      }
    });
    storage.get('lang').then(lang => {
      if (lang != null) {
        this.languageService.setLanguage(lang);
      } else {
        this.languageService.setLanguage(lang);
      }
    });

    this.checkLogin();

    events.subscribe('loggedin', async (username) => {
      await this.setLoginInfo(true, username);
    });

    events.subscribe('logged', async (data) => {
      if (data == "vender") {
        this.vendor = true;
      }
    });

    this.initializeApp();
  }

  public async checkLogin(): Promise<any> {
    const token = await this.authService.getTokenFromStorage();
    if (token == null) {
      this.login = false;
      this.user_name = "";
      this.vendor = false;
    } else {
      const tokenValue = decode(token).data.name;
      if (decode(token).data.role == "vender") {
        this.vendor = true;
      } else {
        this.vendor = false;
      }
      this.setLoginInfo(true, tokenValue);
    }
  }

  async setLoginInfo(data, username) {
    this.login = data;
    this.user_name = username;
  }

  public async logout() {
    await this.authService.logout();
    this.checkLogin();
    this.navController.navigateRoot('/home');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
