import { LanguageService } from './../../services/language.service';
import { Component } from '@angular/core';
// Theme Service:
import { ThemeService } from 'src/app/services/theme.service';
// Alert Controller to show alerts:
import { AlertController } from '@ionic/angular';

// Themes list for Predefined themes in change theme option
const themes = {
  Default: {
    name: 'Default',
    primary: '#5a469c',
    primary_text: '#ffffff',
    background: '#ffffff',
    text: '#5a469c'
  },
  Green: {
    name: 'Green',
    primary: '#1e812b',
    primary_text: '#ffffff',
    background: '#ffffff',
    text: '#1e812b'
  },
  Blue: {
    name: 'Blue',
    primary: '#002fff',
    primary_text: '#ffffff',
    background: '#ffffff',
    text: '#002fff'
  },
  Yellow: {
    name: 'Yellow',
    primary: '#ffff00',
    primary_text: '#000000',
    background: '#ffffff',
    text: '#000000'
  },
  Light: {
    name: 'Light',
    primary: '#737479',
    primary_text: '#ffffff',
    background: '#d7d8da',
    text: '#737479'
  },
  Medium: {
    name: 'Medium',
    primary: '#383a3e',
    primary_text: '#a2a4ab',
    background: '#a2a4ab',
    text: '#383a3e',
  },
  Dark: {
    name: 'Dark',
    primary: '#222428',
    primary_text: '#b3b3b8',
    background: '#383a3e',
    text: '#b3b3b8'
  },
};

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})


export class SettingPage {
  constructor(
    private themeservice: ThemeService,
    private languageService: LanguageService,
    public alertController: AlertController
  ) {
    this.currentLang = this.languageService.currLanguage;  // Taking current language name from language service;
    this.currentTheme = this.themeservice.currTheme;  // Taking current Theme name from theme service;
    this.currentFont = this.themeservice.currFont;  // Taking current font name from theme service;
    this.card_text_color = this.themeservice.primary_color; // Taking current primary color from theme service;
    this.colorPanel = false;
  }

  // Language List for language:
  langList = [
    {
      "text": 'English',
      "val": 'en'
    },
    {
      "text": 'العربية',
      "val": 'ar'
    },
    {
      "text": 'اردو',
      "val": 'ur'
    }
  ];

  // Theme list for colors:
  themeList = ['Default', 'Green', 'Blue', 'Yellow', 'Light', 'Medium', 'Dark'];

  // Font List
  fontList = [{
    "text": 'Default',
    "val": 'Font_5'
  },
  {
    "text": 'Chakra Petch',
    "val": 'ChakraPetch-Light'
  },
  {
    "text": 'Tomorrow Medium',
    "val": 'Tomorrow-Medium'
  },
  {
    "text": 'Dancing Script',
    "val": 'DancingScript-Bold'
  },
  {
    "text": 'Indie Flower',
    "val": 'IndieFlower-Regular'
  }

  ];

  // Variable for styling the ion-card tex color:
  card_text_color: any;

  // Change Language variables:
  selectedLanguage: any = null; // NgModel variable which takes the value from change language;
  currentLang: any; // Variable for display in selected language;

  // Theme variables:
  selectedTheme: any = null;  // NgModel variable which takes the value from change theme;
  currentTheme: any;  // Variable for display in selected theme; 
  // Customize color variables
  colorPanel: boolean;  // variable for hide/show color panel;
  primary_color: string = null; // Variable for button & toolbar background color;
  primary_text_color: string = null;  // Variable for button & toolbar text color;
  background_color: string = null;  // Variable for background color;
  text_color: string = null;  // variable for all text color not for button & toolbar text;


  // Font variables:
  selectedFont: any = null;
  currentFont: string;


  // Change Language
  languageChanged() {
    if (this.selectedLanguage != null) {
      this.languageService.currLanguage = this.selectedLanguage;
      this.languageService.setLanguage(this.selectedLanguage);
    }
  }

  // Change Theme
  themeChanged() {
    if (this.selectedTheme != null) {
      this.themeservice.setTheme(themes[this.selectedTheme]);
    }
  }

  // Show/Hide customize color panel
  customizeColorPanel() {
    this.colorPanel = !this.colorPanel;
  }

  // Customize color theme button click
  customizeTheme() {
    // Check if any color is not selected:
    if (this.primary_color == null || this.primary_text_color == null || this.background_color == null || this.text_color == null) {
      this.presentAlert();  // Show alert if any of the color is not selected
    } else {
      // Initializing the theme with user given colors:
      const customize = {
        name: 'Customize',
        primary: this.primary_color,
        primary_text: this.primary_text_color,
        background: this.background_color,
        text: this.text_color
      }
      this.currentTheme = "Customize";
      // Sending the user customize theme to themeservice for further styling:
      this.themeservice.setTheme(customize);
      // Closing the color panel after applying the theme or after clicking the apply theme button
      this.colorPanel = !this.colorPanel;
    }
  }

  // Alert for theme
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Alert',
      message: 'Please chose all colors.',
      buttons: ['OK']
    });
    await alert.present();
  }

  //  Font chang method:
  fontChanged() {
    if (this.selectedFont != null) {
      this.themeservice.setFont(this.selectedFont);
    }
  }


}
