import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _odata: any;
  public _cridesApiPokemon: any[] = [];
  constructor(private pokemonService: PokemonService) {
    this.readFromFile();
  }
  
  public pokemonUrls: any = [];
  public dataString = JSON.stringify(this.pokemonUrls);


  async writeToFile(pokemonURL: string): Promise<boolean> {
    this.pokemonUrls.push(pokemonURL);
    let result: WriteFileResult = await Filesystem.writeFile({
      //TODO: Ficar la variable que es passa per parametre dins de data
      path: 'pokemons.txt',
      data: JSON.stringify(this.pokemonUrls), //Aqui va la la url del pokemon seleccionat
      directory: Directory.Documents,
      encoding: Encoding.UTF8
      
    });
    if(result.uri && result.uri != '')
      {
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
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    console.log(contents.data);
    
    if(contents.data) {
      this._odata = contents.data;
      console.log(this._odata);
      
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
