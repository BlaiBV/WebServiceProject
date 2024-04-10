import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipusPokemonPage } from './tipus-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: TipusPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipusPokemonPageRoutingModule {}
