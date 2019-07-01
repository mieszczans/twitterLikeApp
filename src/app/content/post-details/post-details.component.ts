import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IPost } from '../models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.less']
})
export class PostDetailsComponent implements OnInit {
  public postDetails: IPost;
  constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.postDetails = this.activatedRoute.snapshot.data['postDetails'];
  }

}
