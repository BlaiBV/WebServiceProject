import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmPokemonPage } from './confirm-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmPokemonPageRoutingModule {}
