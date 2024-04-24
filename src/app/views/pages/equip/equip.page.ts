import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.page.html',
  styleUrls: ['./equip.page.scss'],
})
export class EquipPage /*implements OnInit*/ {

  constructor(private _filesService: FilesService) {}

  //ngOnInit() {}

  crearFitxer(){
    this._filesService.writeToFile();
    this._filesService.readFromFile();
  }
}
