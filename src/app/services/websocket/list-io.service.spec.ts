import { TestBed, inject } from '@angular/core/testing';

import { ListIoService } from './list-io.service';

describe('ListIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListIoService]
    });
  });

  it('should be created', inject([ListIoService], (service: ListIoService) => {
    expect(service).toBeTruthy();
  }));
});
