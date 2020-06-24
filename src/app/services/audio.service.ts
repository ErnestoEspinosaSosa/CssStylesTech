import { Injectable, NgZone, EventEmitter  } from '@angular/core';
import { LocalEventsService } from './local-events.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  frequency;
  analyser;
  ctx;
  data;
  mic;
  osc;
  isPlay;
  sendFrecuency: EventEmitter<any> = new EventEmitter<any>();

  constructor(private zone: NgZone, private localEventsService: LocalEventsService) {
    this.localEventsService.runButtonState.subscribe(() => this.Play());
    this.isPlay = false;
    //this.RunMic();
  }

  Play() {
    this.isPlay = !this.isPlay;
  }

  RunMic() {
    navigator.getUserMedia = navigator.getUserMedia;
    const callback = async stream => {
      this.ctx = new AudioContext();
      this.mic = this.ctx.createMediaStreamSource(stream);
      this.analyser = this.ctx.createAnalyser();
      this.osc = this.ctx.createOscillator();
      this.mic.connect(this.analyser);
      this.osc.connect(this.ctx.destination);
      // osc.start(0);
      this.data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.minDecibels = -45;

      const play = async () => {
        this.analyser.getByteFrequencyData(this.data);
        // get fullest bin
        let idx = 0;
        for (let j = 0; j < this.analyser.frequencyBinCount; j++) {
          if (this.data[j] > this.data[idx]) {
            idx = j;
          }
        }
        this.frequency = (idx * this.ctx.sampleRate) / this.analyser.fftSize;

        if (Math.floor(this.frequency) > 200 && this.isPlay) {
          this.sendFrecuency.emit(Math.floor(this.frequency));
          console.log(Math.floor(this.frequency));
        }
        await this.delay(500);

        this.osc.frequency.value = this.frequency;
        requestAnimationFrame(play);
      };
      await play();
    };

    navigator.getUserMedia(
      { video: false, audio: true },
      callback,
      console.log
    );
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
