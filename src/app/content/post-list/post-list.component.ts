import { ErrorModalComponent } from './../error-modal/error-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tweet } from '../models/post';
import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
  animations: [
    trigger('getPosts', [
      transition('* => *', [
        query('.single-post', style({transform: 'translateX(-100vw)', opacity: 0}), { optional: true }),
        query(':enter', stagger('1000ms', [
          animate('500ms', style({transform: 'translateX(0)', opacity: 100})),
        ]), { optional: true }),
      ])
    ])
  ]
})
export class PostListComponent implements OnInit {
  bsModalRef: BsModalRef;
  public canBeTriggered = true;
  constructor(
    public postService: PostService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.postService.getPosts().pipe(
      map((posts) => this.mapPostsForFakeName(posts)),
    ).subscribe(
      posts => {
        const reversed = posts.reverse();
        this.postService.addPostsToSubject(reversed);
      },
      (err) => {
        this.bsModalRef = this.modalService.show(ErrorModalComponent);
      }
    );
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
