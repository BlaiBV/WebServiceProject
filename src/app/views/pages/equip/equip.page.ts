import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Pokemon } from 'src/app/models/pokemon';
import { BarcodeScannerService } from 'src/app/services/barcode-scanner.service';
import { FilesService } from 'src/app/services/files.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.page.html',
  styleUrls: ['./equip.page.scss'],
})
export class EquipPage {
  public barcode_url: string = ""; // URL del pokemon escanejat
  public confirmar:boolean = false; // Propietat per visualitzar la vista de confirmar el pokemon
  public alerta: boolean = false; // Propietat per visualitzar la vista de l'alerta del límit de pokemons

  constructor(private _filesService: FilesService, private _barcodeScanner: BarcodeScannerService, private _pokemonService: PokemonService) {
    this.isGoogleBarcodeScannerModuleAvailable(); // En iniciar la pàgina comprovem si el scanner de Google està disponible
  }

  crearFitxer(){
    // Funció dedicada a crear el fitxer
    this._filesService.readFromFile();
  }

  async scan(): Promise<boolean> {
    // Funció dedicada a escanejar el codi

    if (this.pokemonTeam.length >= 6) { // En cas que el límit es superi en el proper escaneig (=> 6)
      let done: boolean = await this._barcodeScanner.scan(); // Escanegem
      this.alerta = true; // Activem l'alerta
      return done;
    } else { // En cas que el límit no es superi en el proper escaneig (< 6)
      let done: boolean = await this._barcodeScanner.scan(); // Escanegem
      this.barcode_url = this._barcodeScanner.barcodes[0].rawValue; // Obtenim el codi escanejat i el guardem
      this.retrievePokemon(); // Demanem que es retorni el pokemon i es mostrarà per pantalla
      return done;
    }

  }

  get isSupported(): boolean {
    // Funció dedicada a obtenir si la funcionalitat d'escaneig està suportada
    return this._barcodeScanner.supported;
  }

  get barcodes(): Barcode[] {
    // Funció dedicada a obtenir el resultat de l'escaneig
    return this._barcodeScanner.barcodes;
  }

  async isGoogleBarcodeScannerModuleAvailable() {
    // Funció dedicada a saber si el mòdul d'escaneig de Google està disponible
    let available: boolean = await this._barcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    if(available == false) { // En cas que no estigui disponible l'instal·lem
      BarcodeScanner.installGoogleBarcodeScannerModule();
    }
  }

  tipusColor(tipus: any): any {
    // Funció dedicada a establir el color de fons d'un element atenent el tipus del pokemon

    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black', 'font-size': 'x-small'};
  }

  acceptarPokemon() {
    // Funció dedicada a acceptar el pokemon escanejat

    this.confirmar = false; // Es deixa de mostrar la vista de confirmació del pokemon
    this._filesService.writeToFile(this.barcode_url); // S'afegeix i s'escriu el nou pokemon
    
  }

  denegarPokemon() {
    // Funció dedicada a denegar el pokemon escanejat

    this.confirmar = false; // Es deixa de mostrar la vista de confirmació del pokemon
  }

  tancarAlerta() {
    // Funció dedicada a tancar la vista d'alerta per superar el límit de pokemons de l'equip

    this.alerta = false;
  }

  eliminarPokemon(id: number) {
    // Funció dedicada a eliminar un pokemoon de l'equip
    
    this._filesService.writeToFile("https://pokeapi.co/api/v2/pokemon/" + id + "/", true); // S'utilitza la funció d'escriure, passant la URL del pokemon i el mode eliminar
  }

  retrievePokemon() { 
    // Funció dedicada a retornar la informació del pokemon

    this.confirmar = true; // Activem la vista de confirmació del pokemon
    this._pokemonService.retrievePokemon(parseInt(this.barcode_url.split("/")[6])); // Es retorna el pokemon de service
  }

  // Getters
  get pokemon(): Pokemon | null { return this._pokemonService.pokemon; }
  get pokemonTeam(){ return this._pokemonService.pokemonTeam }
  get isSixPokemons() { return this._pokemonService.isSixPokemons }

}
