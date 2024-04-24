import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokedexPageRoutingModule } from './pokedex-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { PokedexPage } from './pokedex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokedexPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PokedexPage]
})
export class PokedexPageModule {}
