import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPokemonPageRoutingModule } from './confirm-pokemon-routing.module';

import { ConfirmPokemonPage } from './confirm-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPokemonPageRoutingModule
  ],
  declarations: [ConfirmPokemonPage]
})
export class ConfirmPokemonPageModule {}
