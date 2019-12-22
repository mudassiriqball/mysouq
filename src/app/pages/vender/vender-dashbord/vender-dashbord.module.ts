import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenderDashbordPageRoutingModule } from './vender-dashbord-routing.module';

import { VenderDashbordPage } from './vender-dashbord.page';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VenderDashbordPageRoutingModule
  ],
  declarations: [VenderDashbordPage, AddNewProductComponent],
  entryComponents: [AddNewProductComponent]
})
export class VenderDashbordPageModule {}
