import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtacPokemonPageRoutingModule } from './atac-pokemon-routing.module';

import { AtacPokemonPage } from './atac-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtacPokemonPageRoutingModule
  ],
  declarations: [AtacPokemonPage]
})
export class AtacPokemonPageModule {}
