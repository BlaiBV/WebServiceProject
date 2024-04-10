import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokeViewPage } from './poke-view.page';

const routes: Routes = [
  {
    path: '',
    component: PokeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokeViewPageRoutingModule {}
