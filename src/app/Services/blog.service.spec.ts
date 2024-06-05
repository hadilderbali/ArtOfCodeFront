import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';

describe('BlogServiceService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
