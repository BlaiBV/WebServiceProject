import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() {
    //this.fileAppend();
    this.fileRead();
   }

   async fileAppend() {
    await Filesystem.appendFile({
      path: 'text.txt',
      data: "MORE TESTS",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
      
    });
    console.log("exito");
  }
  
   async fileRead() {
    let contents = await Filesystem.readFile({
      path: 'ol.txt',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
  }
}
