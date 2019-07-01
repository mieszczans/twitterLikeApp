import { IPost } from '../models/post';
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
        query(':enter', style({transform: 'translateX(-100vw)', opacity: 0}), { optional: true }),
        query(':leave', stagger('1000ms', [
          animate('300ms', style({transform: 'translateX(0)', opacity: 100})),
        ]), { optional: true }),
      ])
    ])
  ]
})
export class PostListComponent implements OnInit {
  public canBeTriggered = true;
  constructor(
    public postService: PostService,
  ) {}

  ngOnInit() {
    this.postService.getPosts().pipe(
      map((posts) => this.mapPostsForFakeName(posts)),
    ).subscribe(
      posts => {
        const reversed = posts.reverse();
        this.postService.addPostsToSubject(reversed);
      },
      () => {
      }
    );
  }

  mapPostsForFakeName(posts: IPost[]): IPost[] {
    const withFakeNames = posts.map(
      (post: IPost) => {
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
