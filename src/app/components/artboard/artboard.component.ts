import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { LocalEventsService } from '../../services/local-events.service';

import gsap from 'gsap';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.less']
})
export class ArtboardComponent implements OnInit {

  frecuency = [];

  randomR = gsap.utils.random(-360, 360, 10, true);
  randomX = gsap.utils.random(0, 500, 1, true);
  randomY = gsap.utils.random(0, 500, 1, true);
  Sp = 1;
  i = 1;

  constructor(private audioService: AudioService, private localEventsService: LocalEventsService) { }

  ngOnInit() {
    this.localEventsService.runButtonState.subscribe(
      param => {
        this.Sp = param.Sp;
        this.Play();
      });
    this.localEventsService.runButtonPrintState.subscribe(
      () => {
        this.Print();
      });
  }

  Play() {
    this.i = 0;
    while (this.i < 37) {

      const posX = gsap.utils.random([0, 100, 80], true);
      const posY = gsap.utils.random([0, 100, 80, 120, 160], true);

      const rot = gsap.utils.random([0, 90, 180, 270], true);

      gsap.to('.box' + this.i, {
        x: posX,
        y: posY,
        rotation: rot,
        duration: this.Sp
      });
      gsap.to('.box' + this.i, {
        alpha: 1,
        duration: 0
      });

      this.i++;
    }
  }

  Print() {
    const data = document.getElementById('tile');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Pa Diego.pdf');
    });
  }
}
