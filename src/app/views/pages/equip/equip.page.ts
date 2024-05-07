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
  public scanned_pokemon: any;
  public confirmar:boolean = false;
  public alerta: boolean = false;

  constructor(private navCtrl: NavController, private _filesService: FilesService, private _barcodeScanner: BarcodeScannerService, private _pokemonService: PokemonService) {
    this.isGoogleBarcodeScannerModuleAvailable();
  }

  //ngOnInit() {}

  crearFitxer(){
    this._filesService.readFromFile();
  }

  async scan(): Promise<boolean> {
    
    if (this.pokemonTeam.length >= 6) {
      let done: boolean = await this._barcodeScanner.scan();
      this.alerta = true;
      console.log("ALERTA " + this.alerta);
      console.log("HAS SUPERAT EL NOMBRE DE POKEMONS QUE PODEN ESTAR EN UN EQUIP");
      return done;
    } else {
      let done: boolean = await this._barcodeScanner.scan();
      this.barcode_url = this._barcodeScanner.barcodes[0].rawValue;
      this.retrievePokemon();
      return done;
    }

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

  tipusColor(tipus: any): any {
    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black', 'font-size': 'x-small'};
  }

  acceptarPokemon() {
    this.confirmar = false;
    this._filesService.writeToFile(this.barcode_url);
    
  }

  denegarPokemon() {
    this.confirmar = false;
  }

  tancarAlerta() {
    this.alerta = false;
  }

  eliminarPokemon(id: number) {
    console.log("ELIMINAR " + "https://pokeapi.co/api/v2/pokemon/" + id + "/");
    this._filesService.writeToFile("https://pokeapi.co/api/v2/pokemon/" + id + "/", true);
  }

  retrievePokemon() { 
    this.confirmar = true;
    this._pokemonService.retrievePokemon(parseInt(this.barcode_url.split("/")[6])); 
  }

  get pokemon(): Pokemon | null { return this._pokemonService.pokemon; }
  get pokemonTeam(){ return this._pokemonService.pokemonTeam }
  get isSixPokemons() { return this._pokemonService.isSixPokemons }

}
