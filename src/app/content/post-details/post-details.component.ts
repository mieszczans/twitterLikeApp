import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet } from '../models/post';
import { PostService } from '../services/post.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.less']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  public postDetails: Tweet;
  private subscription: Subscription;
  private bsModalRef: BsModalRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private bsModalService: BsModalService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.postDetails = data.postDetails;
        this.checkIfFakeName();
      },
      () => {
        this.bsModalRef = this.bsModalService.show(ErrorModalComponent);
      }
    );
  }

  checkIfFakeName() {
    this.subscription = this.postService.originalPostList$.subscribe(
      (posts) => {
        if (posts && posts[0]) {
          this.findPost(posts);
          return;
        }
        this.postDetails.fakeName = this.postService.createFakeName();
      }
    );

  }

  findPost(posts: Tweet[]) {
    if (posts) {
      const foundPost = posts.find(
        (post) => post.id === this.postDetails.id && post.userId === this.postDetails.userId
      );
      this.addFakeName(foundPost);
    }
  }

  addFakeName(foundPost: Tweet) {
    if (foundPost) {
      this.postDetails.fakeName = foundPost.fakeName;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
