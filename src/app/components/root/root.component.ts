import { Component, OnInit } from '@angular/core';
import { LocalEventsService } from '../../services/local-events.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {

  constructor(private localEventsService: LocalEventsService, private audioService: AudioService) { }

  ngOnInit() {
  }


}
