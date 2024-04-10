import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipusPokemonPageRoutingModule } from './tipus-pokemon-routing.module';

import { TipusPokemonPage } from './tipus-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipusPokemonPageRoutingModule
  ],
  declarations: [TipusPokemonPage]
})
export class TipusPokemonPageModule {}
