import { Injectable, EventEmitter } from '@angular/core';
import { PanelParams } from '../model/panel.param';

@Injectable({
  providedIn: 'root'
})
export class LocalEventsService {

  constructor() { }

  runButtonState: EventEmitter<PanelParams> = new EventEmitter<PanelParams>();
  runButtonPrintState: EventEmitter<any> = new EventEmitter<any>();

  runButton(panelParams: PanelParams) {
    this.runButtonState.emit(panelParams);
  }

  runButtonPrint() {
    this.runButtonPrintState.emit(true);
  }
}
