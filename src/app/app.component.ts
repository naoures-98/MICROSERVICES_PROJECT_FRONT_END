import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ErrorHttpComponent } from './error-http/error-http.component';
import { LoginComponent } from './components/security/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  showNavBar: boolean = true;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let currentRoute = this.activatedRoute;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        return currentRoute.snapshot.routeConfig?.component;
      })
    ).subscribe((component) => {
      // Cacher la navBar si le composant est `NotFoundComponent`
      this.showNavBar = component !== ErrorHttpComponent && component !==LoginComponent;
    });
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

}
