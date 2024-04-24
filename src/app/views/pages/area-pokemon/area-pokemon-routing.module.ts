import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaPokemonPage } from './area-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: AreaPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaPokemonPageRoutingModule {}
