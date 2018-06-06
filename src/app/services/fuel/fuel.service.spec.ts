import { TestBed, inject } from '@angular/core/testing';

import { FuelService } from './fuel.service';

describe('FuelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuelService]
    });
  });

  it('should be created', inject([FuelService], (service: FuelService) => {
    expect(service).toBeTruthy();
  }));
});
