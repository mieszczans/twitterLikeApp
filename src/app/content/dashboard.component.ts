import { Router } from '@angular/router';
import { AuthenticationService } from './../core/services/authentication.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, distinctUntilChanged, map, switchAll } from 'rxjs/operators';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;
  keyUpSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService, public postService: PostService, private route: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.keyUpSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        map((value) => this.postService.searchPost(value)),
        switchAll()
      )
      .subscribe(
        (posts) => {
          this.postService.postListOnWall.next(posts);
        }
      );
  }

  logOut() {
    this.authenticationService.logOut();
  }

  ngOnDestroy(): void {
    this.keyUpSubscription.unsubscribe();
  }
}
