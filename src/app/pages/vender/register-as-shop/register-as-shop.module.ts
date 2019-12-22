import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAsShopPageRoutingModule } from './register-as-shop-routing.module';

import { RegisterAsShopPage } from './register-as-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterAsShopPageRoutingModule
  ],
  declarations: [RegisterAsShopPage]
})
export class RegisterAsShopPageModule {}
