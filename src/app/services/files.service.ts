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
    //this.writeToFile();
    this.readFromFile();
  }
  
  public pokemonUrls = ["https://pokeapi.co/api/v2/pokemon/392/", "https://pokeapi.co/api/v2/pokemon/150/"];
  public dataString = JSON.stringify(this.pokemonUrls);


  async writeToFile(pokemonURL: string): Promise<boolean> {
    let result: WriteFileResult = await Filesystem.writeFile({
      //TODO: Ficar la variable que es passa per parametre dins de data
      path: 'pokemons.txt',
      data: pokemonURL +",", //Aqui va la la url del pokemon seleccionat
      directory: Directory.Documents,
      encoding: Encoding.UTF8
      
    });
    if(result.uri && result.uri != '') return true;
    else {
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
