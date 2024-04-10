import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegioPage } from './regio.page';

const routes: Routes = [
  {
    path: '',
    component: RegioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegioPageRoutingModule {}
