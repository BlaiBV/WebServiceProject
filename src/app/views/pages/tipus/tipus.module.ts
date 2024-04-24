import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipusPageRoutingModule } from './tipus-routing.module';

import { TipusPage } from './tipus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipusPageRoutingModule
  ],
  declarations: [TipusPage]
})
export class TipusPageModule {}
