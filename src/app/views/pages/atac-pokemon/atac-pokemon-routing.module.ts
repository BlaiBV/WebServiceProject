import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtacPokemonPage } from './atac-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: AtacPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtacPokemonPageRoutingModule {}
