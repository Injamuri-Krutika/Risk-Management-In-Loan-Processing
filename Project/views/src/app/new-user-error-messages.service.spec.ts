import { TestBed } from '@angular/core/testing';

import { NewUserErrorMessagesService } from './new-user-error-messages.service';

describe('NewUserErrorMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewUserErrorMessagesService = TestBed.get(NewUserErrorMessagesService);
    expect(service).toBeTruthy();
  });
});
