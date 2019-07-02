import { ErrorModalComponent } from './../error-modal/error-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tweet } from '../models/post';
import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { showPosts } from './post-list.animations';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
  animations: [showPosts]
})
export class PostListComponent implements OnInit {
  bsModalRef: BsModalRef;
  posts: Observable<Tweet[]>;
  constructor(
    public postService: PostService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().pipe(
      map((posts) => this.mapPostsForFakeName(posts)),
      map((posts) => posts.reverse()),
    ).subscribe(
      (posts) => {
        this.postService.addPostsToSubject(posts);
      },
      () => {
        this.bsModalRef = this.modalService.show(ErrorModalComponent);
      }
    );
    this.posts = this.postService.postListOnWall;
  }

  mapPostsForFakeName(posts: Tweet[]): Tweet[] {
    const withFakeNames = posts.map(
      (post: Tweet) => {
        return ({
          userId: post.userId,
          id: post.id,
          title: post.title,
          body: post.body,
          fakeName: this.postService.createFakeName(),
        });
      }
    );
    return withFakeNames;
  }
}