import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import * as Color from 'color';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currTheme: any;
  card_text_color: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage
  ) {
    storage.get('theme').then(theme => {
      this.currTheme = theme.name;
      this.card_text_color = theme.primary;
      const cssText = CSSTextGenerator(theme);
      this.setGlobalCSS(cssText);
    });
  }

  // Override all global variables with a new theme
  setTheme(theme) {
    this.storage.set('theme', theme);
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
    // this.document.documentElement.style.fontFamily
  }

}

const defaults = {
  primary: '#5a469c',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '##989aa2',
  light: '#f4f5f8'
};

function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    background,
    background_text,
    toolbar_color,
    text,
  } = colors;

  const shadeRatio = 0.3;
  const tintRatio = 0.1;
  return `
    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: ${primary};
    --ion-color-primary-contrast: ${text};

    --ion-color-primary-shade: ${Color(primary).darken(shadeRatio)};

    --ion-background-color: ${background};
    --ion-background-color-rgb: ${background};

    --ion-text-color: ${background_text};
    --ion-text-color-rgb: ${background_text};

    --ion-backdrop-color: ${Color(primary).darken(shadeRatio)};
     --card-md-text-color: #ffffff;
    --ion-overlay-background-color: #ffffff;
    --ion-border-color: ;
    --ion-box-shadow-color:;

    --ion-tab-bar-background:;
    --ion-tab-bar-background-focused:;
    --ion-tab-bar-border-color:;
    --ion-tab-bar-color:;
    --ion-tab-bar-color-activated:;

    --ion-toolbar-background: ${Color(primary).lighten(0.21)};
    --ion-toolbar-border-color: ;
    --ion-toolbar-color: ${toolbar_color};
    --ion-toolbar-color-activated:;
    --ion-toolbar-color-unchecked:;
    --ion-toolbar-color-checked:;

    --ion-item-background:;
    --ion-item-background-activated:;
    --ion-item-border-color:;
    --ion-item-color: 00ff00;

    --ion-placeholder-color:;
`;
}

// --ion-color-base: ${light};
// --ion-color-contrast: ${dark};

// --ion - background - color: ${ light };; //background color
// --ion-overlay-background:${light};;
// --ion - text - color: ${ dark }; // txt color + icon color

// --ion-toolbar-background: #000000; // toolbar background
    // --ion-toolbar-text-color:#ffffff; // not working
    // --ion-item-background:#B4436C; // not working
    // --ion-item-text-color:#cccccc;

    // --ion-color-primary:#222428; // button.3line background
    // --ion-color-primary-rgb: 34,34,34;
    // --ion-color-primary-contrast: #ffffff; // button text
    // --ion-color-primary-contrast-rgb: 255 255 255;
    // --ion-color-primary-shade:  #le2023; //click color
    // --ion-color-primary-tint:  #383a3e;