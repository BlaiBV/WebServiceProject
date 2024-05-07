import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _odata: any;
  public _cridesApiPokemon: any[] = [];
  public pokemonUrls: any = [];
  public dataString = JSON.stringify(this.pokemonUrls);

  constructor(private pokemonService: PokemonService) {
    this.readFromFile();
  }
  

  async writeToFile(pokemonURL: string, eliminar: boolean = false): Promise<boolean> {
    if (!eliminar) {
      console.log("URL " + pokemonURL);
      console.log("URL " + typeof(pokemonURL));
      this.pokemonUrls.push(pokemonURL);

    } else {
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

    console.log("Write " + this.pokemonUrls);
    console.log("Write " + this.pokemonUrls.length);
    console.log("Stringify " + JSON.stringify(this.pokemonUrls));
    console.log("Stringify " + JSON.stringify(this.pokemonUrls).length);

    let contingut = '[';
    for (let i: number = 0; i < this.pokemonUrls.length; i++) {
      if (i != this.pokemonUrls.length-1) {
        contingut += '"' + this.pokemonUrls[i] + '",';
      } else {
        contingut += '"' + this.pokemonUrls[i] + '"';
      }
      
    }
    contingut += "]"

    console.log("Contingut " + contingut);


    let result: WriteFileResult = await Filesystem.writeFile({
      path: 'pokemons.txt',
      data: contingut, 
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    if(result.uri && result.uri != '')
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

    let contents = await Filesystem.readFile({
      path: 'pokemons.txt',
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    if(contents.data) {
      this._odata = contents.data;
      console.log("ODATA " + this._odata);
      console.log("TRANSFORMACIÓ " + this._odata.replaceAll('"','').replace('[','').replace(']','').split(','));
      console.log("TRANSFORMACIÓ " + typeof(this._odata.replaceAll('"','').replace('[','').replace(']','').split(',')));
      console.log("TRANSFORMACIÓ " + this._odata.replaceAll('"','').replace('[','').replace(']','').split(',').length);
      
      let transformacio: any = this._odata.replaceAll('"','').replace('[','').replace(']','').split(',');
      for (let i: number = 0; i < transformacio.length; i++) {
        this.pokemonUrls.push(transformacio[i]);
        console.log("TRANSFORMACIÓ ITEM " + transformacio[i]);
      }
      //this.pokemonUrls.push(this._odata.replaceAll('"','').replace('[','').replace(']','').split(','));
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
