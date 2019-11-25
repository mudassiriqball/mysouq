// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LanguageService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currLanguage: string;
  constructor(
    private translate: TranslateService, private storage: Storage
  ) {
    storage.get('language').then(lang => {
      if (lang == null) {
        this.setLanguage('en');
      }
      else {
        this.setLanguage(lang);
      }
    });
  }

  // Set language
  setLanguage(lang) {
    if (lang == 'en') {
      this.currLanguage = 'English';
      this.translate.use(lang);
    }
    else if (lang == 'ar') {
      this.currLanguage = "العربية";
      this.translate.use(lang);
    }
    this.storage.set('language', lang);
  }
}


// getDefaultLanguage() {
  //   let language = this.translate.getBrowserLang();
  //   this.translate.setDefaultLang(language);
  //   return language;
  // }