import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltrePageRoutingModule } from './filtre-routing.module';

import { FiltrePage } from './filtre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrePageRoutingModule
  ],
  declarations: [FiltrePage]
})
export class FiltrePageModule {}
