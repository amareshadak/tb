import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  Url: string = environment.apiUrl;
  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  login(credentials) {
    return this.http.post(
      this.Url + "/gatekeeper/signin",
      JSON.stringify(credentials),
      this.headers
    );
  }

  logout() {
    alert("logout");
  }

  isLoggedIn() {
    if (
      localStorage.getItem("baketracker_token") !== "" &&
      localStorage.getItem("baketracker_token") !== null
    ) {
      return true;
    }
    return false;
  }

  getCurrentUser() {
    const token = localStorage.getItem("baketracker_token");
    if (!token) {
      return null;
    }
    return {
      name: localStorage.getItem("baketracker_name"),
      username: localStorage.getItem("baketracker_username"),
      role: localStorage.getItem("baketracker_role")
    };
  }
}
