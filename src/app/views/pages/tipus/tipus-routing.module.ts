import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipusPage } from './tipus.page';

const routes: Routes = [
  {
    path: '',
    component: TipusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipusPageRoutingModule {}
