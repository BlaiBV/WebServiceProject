import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokeViewPageRoutingModule } from './poke-view-routing.module';

import { PokeViewPage } from './poke-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokeViewPageRoutingModule
  ],
  declarations: [PokeViewPage]
})
export class PokeViewPageModule {}
