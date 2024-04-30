import { Injectable } from '@angular/core';
import { Barcode, BarcodeFormat, BarcodeScanner, IsSupportedResult, PermissionStatus, ScanOptions, ScanResult } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
//Tinc suport per utilitzar la camara o no
  private _supported: boolean;
  private _barcodes: Barcode[];
  private _resultat: Barcode[];
  
  constructor() {
    this._supported = false;
    this._barcodes = [];
    this._resultat = [];
    this.isSupported();
  }

  isSupported(): void {
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
    return this._barcodes;
  }

  get supported(): boolean {
    return this._supported;
  }
  
  async isGoogleBarcodeScannerModuleAvailable(): Promise<boolean> {
    const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  get resultat(): Barcode[] {
    return this._resultat;
  }
}
