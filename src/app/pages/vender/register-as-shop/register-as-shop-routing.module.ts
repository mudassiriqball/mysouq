import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAsShopPage } from './register-as-shop.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAsShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAsShopPageRoutingModule {}
