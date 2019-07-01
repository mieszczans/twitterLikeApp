import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { IPost } from '../models/post';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
  protected basicUrl = 'https://jsonplaceholder.typicode.com';
  public searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private postListSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(null);
  public originalPostList$ = this.postListSubject.asObservable().pipe();
  public postListOnWall: Subject<IPost[]> = new Subject();

  constructor(private http: HttpClient) {}

  addPostsToSubject(posts: IPost[]): void {
    this.postListSubject.next(posts);
    this.postListOnWall.next(posts);
  }

  searchPost(searchText: string): Observable<IPost[]> {
    if (searchText === '') {
      return this.originalPostList$;
    }
    return this.originalPostList$.pipe(
      map(posts =>
        posts.filter(
          post =>
            post.title.includes(searchText) || post.body.includes(searchText)
        )
      )
    );
  }

  createFakeName(): string {
    let fakeName = '';
    const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const possibleNumbers = '0123456789';
    for (let i = 0; i < 8; i++) {
      fakeName += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
    }
    for (let i = 0; i < 3; i++) {
      fakeName += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));
    }
    return fakeName;
  }

  // HTTP
  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.basicUrl}/posts`);
  }

  getPostDetails(postNumber: number): Observable <IPost> {
    return this.http.get<IPost>(`${this.basicUrl}/posts/${postNumber}`);
  }
}
