import { Component, OnInit } from '@angular/core';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScannerService } from 'src/app/services/barcode-scanner.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit {

  constructor(private _barcodeScanner: BarcodeScannerService) { }

  ngOnInit() {
  }

  async scan(): Promise<boolean> {
    let done: boolean = await this._barcodeScanner.scan();
    return done;
  }

  get isSupported(): boolean {
    return this._barcodeScanner.supported;
  }

  get barcodes(): Barcode[] {
    return this._barcodeScanner.barcodes;
  }

}
