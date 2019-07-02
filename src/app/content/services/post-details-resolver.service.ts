import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs/operators';
import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Tweet } from '../models/post';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PostDetailsResolverService implements Resolve<Tweet> {
  bsModalRef: BsModalRef;
  constructor(private postService: PostService, private bsModalService: BsModalService) { }

  resolve(route: ActivatedRouteSnapshot): Tweet | Observable<Tweet> | Promise<Tweet> {
    return this.postService.getPostDetails(route.params['id'])
    .pipe(
      catchError((err) => {
        this.bsModalRef = this.bsModalService.show(ErrorModalComponent);
        return of(err);
      })
    );
  }

}
