import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError,forkJoin, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  auth(user,pass) {
    console.log(user)
    
    return this.http.post("http://localhost:8600/v1/authentication/user/"+user,pass,{responseType: 'text'});
 }

 //Function to register new user
 registerUser(userDetails):Observable<any>{

  const options = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post("http://localhost:8600/v1/authentication/user",userDetails,{ headers:options }).pipe(
    tap(data => console.log(`Data fecthced: ${data}`)),
    catchError(this.errorHandler)
  )
}


//Error handler
errorHandler(err:HttpErrorResponse){
  let errorMessage:string = "";
  if (err.error instanceof Error) {
    errorMessage=err.error.message;
    } 
    else {
      console.log(`Backend returned code ${err}`);
      errorMessage=err.error;
    }
    return throwError(errorMessage); 
}
}
