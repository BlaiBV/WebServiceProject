import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltrePage } from './filtre.page';

const routes: Routes = [
  {
    path: '',
    component: FiltrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltrePageRoutingModule {}
