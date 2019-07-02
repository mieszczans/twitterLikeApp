import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Tweet } from '../models/post';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
  protected basicUrl = 'https://jsonplaceholder.typicode.com';
  private postListSubject: BehaviorSubject<Tweet[]> = new BehaviorSubject<Tweet[]>(null);
  public searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public originalPostList$ = this.postListSubject.asObservable().pipe();
  public postListOnWall: Subject<Tweet[]> = new Subject();

  constructor(private http: HttpClient) {}

  addPostsToSubject(posts: Tweet[]): void {
    this.postListSubject.next(posts);
    this.postListOnWall.next(posts);
  }

  searchPost(searchText: string): Observable<Tweet[]> {
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
  getPosts(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${this.basicUrl}/posts`);
  }

  getPostDetails(postNumber: number): Observable<Tweet> {
    return this.http.get<Tweet>(`${this.basicUrl}/posts/${postNumber}`);
  }
}
