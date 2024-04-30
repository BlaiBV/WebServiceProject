import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Pokemon } from 'src/app/models/pokemon';
import { BarcodeScannerService } from 'src/app/services/barcode-scanner.service';
import { FilesService } from 'src/app/services/files.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.page.html',
  styleUrls: ['./equip.page.scss'],
})
export class EquipPage /*implements OnInit*/ {
  public barcode_url: string = "";
  public accepted: boolean | undefined;
  public pokemon: any;

  constructor(private navCtrl: NavController, private _filesService: FilesService, private _barcodeScanner: BarcodeScannerService) {
    this.isGoogleBarcodeScannerModuleAvailable();

    const navigationState = window.history.state;
    if (navigationState) {
      this.accepted = navigationState.accepted;
      this.pokemon = navigationState.pokemon;

      console.log("Accepted" + this.accepted);
    }
  }

  //ngOnInit() {}

  crearFitxer(){
    this._filesService.writeToFile();
    this._filesService.readFromFile();
  }

  async scan(): Promise<boolean> {
    let done: boolean = await this._barcodeScanner.scan();
    this.barcode_url = this._barcodeScanner.barcodes[0].rawValue;
    this.navCtrl.navigateForward(`/confirm-pokemon/${encodeURIComponent(this.barcode_url)}`);
    return done;
  }

  get isSupported(): boolean {
    return this._barcodeScanner.supported;
  }

  get barcodes(): Barcode[] {
    return this._barcodeScanner.barcodes;
  }

  async isGoogleBarcodeScannerModuleAvailable() {
    let available: boolean = await this._barcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    if(available == false) {
      BarcodeScanner.installGoogleBarcodeScannerModule();
    }
  }

}
