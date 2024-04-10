import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipPageRoutingModule } from './equip-routing.module';

import { EquipPage } from './equip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipPageRoutingModule
  ],
  declarations: [EquipPage]
})
export class EquipPageModule {}
