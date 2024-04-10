import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipPage } from './equip.page';

const routes: Routes = [
  {
    path: '',
    component: EquipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipPageRoutingModule {}
