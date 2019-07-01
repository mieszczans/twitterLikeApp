import { TestBed, inject } from '@angular/core/testing';

import { PostDetailsResolverService } from './post-details-resolver.service';

describe('PostDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostDetailsResolverService]
    });
  });

  it('should be created', inject([PostDetailsResolverService], (service: PostDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
