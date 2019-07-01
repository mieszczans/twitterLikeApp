import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IPost } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.less']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  public postDetails: IPost;
  private subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.postDetails = this.activatedRoute.snapshot.data['postDetails'];
    this.subscription = this.postService.originalPostList$.subscribe(
      (posts) => {
        this.findPost(posts);
      }
    );
  }

  findPost(posts: IPost[]) {
    if (posts) {
      const foundPost = posts.find(
        (post) => post.id === this.postDetails.id && post.userId === this.postDetails.userId
      );
      this.addFakeName(foundPost);
    }
  }

  addFakeName(foundPost: IPost) {
    if (foundPost) {
      this.postDetails.fakeName = foundPost.fakeName;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
