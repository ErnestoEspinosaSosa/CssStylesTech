import { Component, OnInit } from '@angular/core';
import { LocalEventsService } from '../../services/local-events.service';
import { PanelParams } from '../../model/panel.param';
const dat = require('dat.gui');

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {

  Sp = 0.8;

  constructor(private localEventsService: LocalEventsService) { }

  ngOnInit() {
      const gui = new dat.default.GUI({width: 300});
      const obj = {
        displayOutline: false,
        speed: 0.8,
        run:  () => this.Run(),
        print:  () => this.Print()
      };
      gui.remember(obj);
      const slider = gui.add(obj, 'speed', 0, 5);
      gui.add(obj, 'displayOutline');
      gui.add(obj, 'run');
      gui.add(obj, 'print');

      slider.onFinishChange(function(value) {
        this.Sp = value;
      });
  }

  Run() {
    const panelParams = new PanelParams(this.Sp);
    this.localEventsService.runButton(panelParams);
  }

  Print() {
    this.localEventsService.runButtonPrint();
  }
}
