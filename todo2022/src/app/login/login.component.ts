import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "./auth.service";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  username: string;
  password: string;

  loading = false;
  form: FormGroup;

  ngOnInit() {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.redirectTo("/projects");
      this.fackLoading();
    } else {
      alert("Invalid credentials");
      this.form.reset();
    }
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  fackLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
