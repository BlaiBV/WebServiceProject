import { Injectable } from '@angular/core';
import { Barcode, BarcodeFormat, BarcodeScanner, IsSupportedResult, PermissionStatus, ScanOptions, ScanResult } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  private _supported: boolean; // Suport per la funcionalitat
  private _barcodes: Barcode[]; // Codis 
  private _resultat: Barcode[]; // Coids resultants
  
  constructor() {
    this._supported = false;
    this._barcodes = [];
    this._resultat = [];
    this.isSupported();
  }

  isSupported(): void {
    // Funció per comprovar si el dispositiu suporta la funcionalitat
    BarcodeScanner.isSupported().then(
      (result: IsSupportedResult) => {
        this._supported = result.supported;
      }
    ).catch(
      (error: any) => {
        this._supported = false;
      }
    ).finally(() => {});
  }

  async requestPermissions(): Promise<boolean> {
    const permissions: PermissionStatus = await BarcodeScanner.requestPermissions();
    return permissions.camera === 'granted' || permissions.camera === 'limited';
  }

  async scan(): Promise<boolean> {
    // Funció dedicada a escanejar 
    const granted = await this.requestPermissions();
    if(granted) { 
      const options: ScanOptions = {
        formats: [BarcodeFormat.Ean13, BarcodeFormat.QrCode]
      }

      //Si treiem el options ens agafa tot per defecte
      const result: ScanResult = await BarcodeScanner.scan(options);
      this._barcodes = result.barcodes;
      this._resultat = result.barcodes;

      return true;
    }
    this._barcodes = [];
    return false;
  }

  get barcodes(): Barcode[] {
    // Funció dedicada a retornar els codis
    return this._barcodes;
  }

  get supported(): boolean {
    // Funció dedicada a retornar si el dispositiu suporta la funcionalitat
    return this._supported;
  }
  
  async isGoogleBarcodeScannerModuleAvailable(): Promise<boolean> {
    // Funció dedicada a comprovar si el mòdul d'escaneig de Google està disponible
    const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  get resultat(): Barcode[] {
    // Funció dedicada a retornar els codis
    return this._resultat;
  }
}
