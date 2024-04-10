import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegioPageRoutingModule } from './regio-routing.module';

import { RegioPage } from './regio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegioPageRoutingModule
  ],
  declarations: [RegioPage]
})
export class RegioPageModule {}
