import { Component, OnInit } from "@angular/core";
import { AuthService } from "./login/auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public title = "My TODO App";
  public isAuthenticated: Observable<boolean>;

  constructor(public authService: AuthService, public router: Router) {}

  async ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.isLoggedIn();
    this.router.navigate([""]);
  }
}
