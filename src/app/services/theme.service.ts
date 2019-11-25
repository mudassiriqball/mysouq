import { AppComponent } from './../app.component';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import * as Color from 'color';
const defaults = {
  name: 'Default',
  primary: '#5a469c',
  primary_text: '#ffffff',
  background: '#ffffff',
  text: '#5a469c'
};
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // Variable to show the current theme name on the change theme in setting page:
  currTheme: any;

  // Primary color for ion-card text color:
  primary_color: any;

  // Variable to show current applied font name in setting page:
  currFont: string = 'Default';

  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage,
  ) { }
  private appcomponent: AppComponent;
  // Override all global variables with a new theme
  setTheme(theme) {
    this.currTheme = theme.name;
    this.primary_color = theme.primary;
    this.storage.set('theme', theme);
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
  }


  // Define a single CSS variable
  // setVariable(name, value) {
  //   this.document.documentElement.style.setProperty(name, value);
  // }

  // Apply the theme to the document
  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }

  // Apply the font to the document:
  setFont(font) {
    // if (font == null) {
    //   this.currFont = 'Default';
    // } else {
      this.currFont = font;
      this.storage.set('font', font);
      this.document.documentElement.style.fontFamily = font;
    // }
  }

}



// Contrast the color
function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}

// Generate theme
function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    primary_text,
    background,
    text,
  } = colors;

  const shadeRatio = 0.3;
  const tintRatio = 0.1;
  return `
    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: ${primary};
    --ion-color-primary-contrast: ${primary_text};

    --ion-color-primary-shade: ${Color(primary).darken(shadeRatio)};

    --ion-background-color: ${background};
    --ion-background-color-rgb: ${background};

    --ion-text-color: ${text};
    --ion-text-color-rgb: ${text};

    --ion-backdrop-color: ${Color(primary).darken(shadeRatio)};

    --ion-toolbar-background: ${Color(primary).lighten(0.1)};
    --ion-toolbar-color: ${primary_text};
`;
}
