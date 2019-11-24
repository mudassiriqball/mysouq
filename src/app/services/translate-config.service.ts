import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  language: any;
  constructor(
    private translate: TranslateService, private storage: Storage
  ) {
    storage.get('language').then(lang => {
      if (lang == 'en') {
        this.language == "English";
      } else {
        this.language = "العربية";
      }
      this.setLanguage(lang);
    });
   }

  // getDefaultLanguage() {
  //   let language = this.translate.getBrowserLang();
  //   this.translate.setDefaultLang(language);
  //   return language;
  // }

  setLanguage(lang) {
    this.translate.use(lang);
    this.storage.set('language', lang);
  }
}
