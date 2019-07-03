import { DashboardModule } from './content/dashboard.module';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NgModuleFactoryLoader } from '@angular/core';
import { Location } from '@angular/common';
describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            loadChildren: 'app/content/dashboard.module#DashboardModule'
          },
          {
            path: '**',
            redirectTo: '404',
            pathMatch: 'full'
          }
        ])
      ],
      declarations: [AppComponent],
      providers: [Location]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'TwitterLikeApp'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TwitterLikeApp');
  }));

  it('navigate to "" without credentials redirect you to "/login"', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = { lazyModule: DashboardModule };
    router.resetConfig([{ path: '', loadChildren: 'lazyModule' }]);

    router.navigateByUrl('');
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/login');
  }));

  it('should navigate to page "404" if incorrect path', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = { lazyModule: DashboardModule };
    router.resetConfig([
      { path: '', loadChildren: 'lazyModule' },
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ]);

    router.navigateByUrl('fakePath');
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/404');
  }));

});
