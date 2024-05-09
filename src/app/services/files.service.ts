import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _odata: any;
  public _cridesApiPokemon: any[] = [];
  public pokemonUrls: any = []; // Per emmagatzemar les URL de cada pokemon
  public dataString = JSON.stringify(this.pokemonUrls);

  constructor(private pokemonService: PokemonService) {
    this.readFromFile(); // En inicilitzar el service, es llegeix el fitxer
  }
  

  async writeToFile(pokemonURL: string, eliminar: boolean = false): Promise<boolean> {
    // Funció dedicada a escriure  al fitxer l'array PokemonUrls

    if (!eliminar) { // En cas que no estigui en mode eliminar, es fa push de la URL passada per paràmetre a l'array pokemonUrls
      console.log("URL " + pokemonURL);
      console.log("URL " + typeof(pokemonURL));
      this.pokemonUrls.push(pokemonURL);

    } else { // En cas que estigui en mode eliminar, es treu la URL de l'array un cop, per no borrar tots els pokemons d'un mateix tipus
      let continuar = true;
      let i: number = 0;
      while (continuar && i < this.pokemonUrls.length) {
        if (this.pokemonUrls[i] == pokemonURL) {
          this.pokemonUrls.splice(i,1);
          continuar = false;
        }
        i++;
      }
    }

    // Console logs per comprovar que no s'escriu bé
    console.log("Write " + this.pokemonUrls);
    console.log("Write " + this.pokemonUrls.length);
    console.log("Stringify " + JSON.stringify(this.pokemonUrls));
    console.log("Stringify " + JSON.stringify(this.pokemonUrls).length);

    // En aquest for passem l'array pokemonsUrls a string
    let contingut = '[';
    for (let i: number = 0; i < this.pokemonUrls.length; i++) {
      if (i != this.pokemonUrls.length-1) {
        contingut += '"' + this.pokemonUrls[i] + '",';
      } else {
        contingut += '"' + this.pokemonUrls[i] + '"';
      }
      
    }
    contingut += "]"

    // Console log per comprovar com ha quedat
    console.log("Contingut " + contingut);

    // Escrivim
    let result: WriteFileResult = await Filesystem.writeFile({
      path: 'pokemons.txt',
      data: contingut, 
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    if(result.uri && result.uri != '') // En cas que s'hagi realitzat l'escriptura, es buida l'array i es llegeix el fitxer
      {
        this.pokemonUrls = [];
        this.readFromFile();
        return true;
      }else {
        console.log("Error d'escriptura");
        return false;
    }

  }
  
  async readFromFile(): Promise<boolean> {
    // Funció dedicada a llegir el fitxer i afegir les URL's dels pokemons a l'array

    // Es llegeix la informació del fitxer
    let contents = await Filesystem.readFile({
      path: 'pokemons.txt',
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    if(contents.data) { // En cas que hi hagi informació al fitxer

      // Console logs per veure com queda de les següents formes
      this._odata = contents.data;
      console.log("ODATA " + this._odata);
      console.log("TRANSFORMACIÓ " + this._odata.replaceAll('"','').replace('[','').replace(']','').split(','));
      console.log("TRANSFORMACIÓ " + typeof(this._odata.replaceAll('"','').replace('[','').replace(']','').split(',')));
      console.log("TRANSFORMACIÓ " + this._odata.replaceAll('"','').replace('[','').replace(']','').split(',').length);
      
      let transformacio: any = this._odata.replaceAll('"','').replace('[','').replace(']','').split(','); //S'esborren [ i ", es converteix a array per les comes
      for (let i: number = 0; i < transformacio.length; i++) { // Es transforma el string amb comes a array
        this.pokemonUrls.push(transformacio[i]);
        console.log("TRANSFORMACIÓ ITEM " + transformacio[i]);
      }
      
      // Console logs de com ha funcionat d'aquesta forma
      console.log("Read " + this.pokemonUrls);
      console.log("Read " + this.pokemonUrls.length);

      if(!(this._odata instanceof Blob)) this._odata = JSON.parse(this._odata);
      this.pokemonService.retrievePokemonByUrl(this._odata);
      return true;

    } else {
      return false;
    }

  }

  get data(): any {
    return this._odata;
  }

}
