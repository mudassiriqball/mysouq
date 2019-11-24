import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

const themes = {
  Default: {
    name: 'Default',
    primary: '#5a469c',
    background: '#FFFFFF',
    toolbar_color: '#f4f5f8',
    background_text: '#4d3894',
    text: '#f4f5f8'
  },
  Secondary: {
    name: 'Secondary',
    primary: '#1e812b',
    background: '#FFFFFF',
    toolbar_color: '#ffffff',
    background_text: '#1e812b',
    text: '#ffffff'
  },
  Light: {
    name: 'Light',
    primary: '#898b92',
    background: '#d7d8da',
    toolbar_color: '#222428',
    background_text: '#383a3e',
    text: '#383a3e'
  },
  Medium: {
    name: 'Medium',
    primary: '#383a3e',
    background: '#a2a4ab',
    toolbar_color: '#a2a4ab',
    background_text: '#383a3e',
    text: '#a2a4ab',
  },
  Dark: {
    name: 'Dark',
    primary: '#222428',
    background: '#383a3e',
    toolbar_color: '#f4f5f8',
    background_text: '#e2e2e2',
    text: '#e2e2e2'
  },
};

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
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
  themeList = ['Default', 'Secondary', 'Light', 'Medium', 'Dark'];

  card_text_color: any;
  currentLang: any;
  currentTheme: any;
  selectedLanguage: any = null;
  selectedTheme: any = null;
  color: any;
  params = { value: 'Hellow' };
  colorPanel: boolean;

  constructor(
    private themeservice: ThemeService,
    private translateconfigservice: TranslateConfigService
  ) {
    this.currentLang = this.translateconfigservice.language;
    this.currentTheme = this.themeservice.currTheme;
    this.card_text_color = this.themeservice.card_text_color;
    this.colorPanel = false;
  }

  // Change Language
  languageChanged() {
    if (this.selectedLanguage != null) {
      this.translateconfigservice.language = this.selectedLanguage;
      this.translateconfigservice.setLanguage(this.selectedLanguage);
    }
  }
  popup: any;
  // Change Theme
  themeChanged() {
    if (this.selectedTheme != null) {
      this.themeservice.currTheme = this.selectedTheme;
      this.themeservice.setTheme(themes[this.selectedTheme]);
    }
  }
  customizeColorPanel() {
    this.colorPanel = !this.colorPanel;
  }
}
