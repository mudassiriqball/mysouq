import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//  Language service:
import { LanguageService } from './services/language.service';
//  Theme Service:
import { ThemeService } from './services/theme.service';
import { Storage } from '@ionic/storage';

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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: Storage,
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
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
