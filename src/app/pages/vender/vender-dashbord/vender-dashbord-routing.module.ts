import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenderDashbordPage } from './vender-dashbord.page';

const routes: Routes = [
  {
    path: '',
    component: VenderDashbordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenderDashbordPageRoutingModule {}
