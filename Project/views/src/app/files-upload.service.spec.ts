import { TestBed } from '@angular/core/testing';

import { FilesUploadService } from './files-upload.service';

describe('FilesUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilesUploadService = TestBed.get(FilesUploadService);
    expect(service).toBeTruthy();
  });
});
