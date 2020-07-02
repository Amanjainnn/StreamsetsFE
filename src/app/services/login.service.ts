import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  auth(user,pass) {
    console.log(user)
    return this.http.get("http://localhost:8600/v1/authentication/user/"+user,pass);
 }
}
