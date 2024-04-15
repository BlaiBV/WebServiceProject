import { Injectable } from '@angular/core';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() {}

   async fileAppend() {
    await Filesystem.appendFile({
      path: 'text1.txt',
      data: "Nova prova",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
      
    });
    console.log("Perfecte");
  }
  
   async fileRead() {
    let contents = await Filesystem.readFile({
      path: 'text1.txt',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
  }


}
