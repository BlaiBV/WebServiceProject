import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, WriteFileResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _odata: any;
  constructor() {}
  
  async writeToFile(): Promise<boolean> {
    let result: WriteFileResult = await Filesystem.writeFile({
      path: 'text1.txt',
      data: "Nova prova", //Aqui va la id del pokemon seleccionat
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
      path: 'text1.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    console.log(contents);
    
    if(contents.data) {
      this._odata = contents.data;
      if(!(this._odata instanceof Blob)) this._odata = JSON.parse(this._odata);
      return true;
    } else {
      return false;
    }
  }

  get data(): any {
    return this._odata;
  }

}
