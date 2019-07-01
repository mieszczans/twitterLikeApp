import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IPost } from '../models/post';

@Injectable()
export class PostDetailsResolverService implements Resolve<IPost> {

  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.postService.getPostDetails(route.params['id']);
  }

}
