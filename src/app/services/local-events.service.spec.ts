import { TestBed } from '@angular/core/testing';

import { LocalEventsService } from './local-events.service';

describe('LocalEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalEventsService = TestBed.get(LocalEventsService);
    expect(service).toBeTruthy();
  });
});
