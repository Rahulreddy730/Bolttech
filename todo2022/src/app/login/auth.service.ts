import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {
  public isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  public _login = new Observable<boolean>();
  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    return !!localStorage.getItem("username");
  }

  login(username, password): boolean {
    if (username == "admin" && password == "admin") {
      localStorage.setItem("username", JSON.stringify(username));
      this.isLoginSubject.next(true);
      this._login = this.isLoginSubject.asObservable();
      return true;
    }
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    console.log("logout");
    localStorage.removeItem("username");
    this.isLoginSubject.next(false);
  }

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn(): Observable<boolean> {
     this._login = this.isLoginSubject.asObservable();
      return this._login;
  }

 isAuth(): boolean {
  var username = localStorage.getItem("username");
  if(username === undefined){
    return false;
  }else{
    return true;
  }
 }
}
