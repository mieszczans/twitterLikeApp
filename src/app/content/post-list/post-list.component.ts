import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
  animations: [
    trigger('getPosts', [
      transition('* => *', [
        query('.single-post', style({transform: 'translateX(-100%)', opacity: 0}), { optional: true }),
        query('.single-post', stagger('1000ms', [
          animate('300ms', style({transform: 'translateX(0)', opacity: 100})),
        ]), { optional: true }),
      ])
    ])
  ]
})
export class PostListComponent implements OnInit {
  public canBeTriggered = true;
  constructor(public postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(
      posts => {
        const reversed = posts.reverse();
        this.postService.addPostsToSubject(reversed);
      },
      err => {
        console.log(err);
      }
    );
  }
}
