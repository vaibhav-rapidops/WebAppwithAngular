import { TestBed } from '@angular/core/testing';

import { WebAppService } from './web-app.service';

describe('WebAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebAppService = TestBed.get(WebAppService);
    expect(service).toBeTruthy();
  });
});
