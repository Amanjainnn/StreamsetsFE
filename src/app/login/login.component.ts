import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router,Routes  } from '@angular/router';
import {LoginService}  from '../services/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 
 
  myControl = new FormControl();
   states;
   succ=false;
   errorMessage: string;
  successMessage: string;
  constructor(private router: Router,private fb: FormBuilder,public snackBar: MatSnackBar,private loginservice:LoginService) {
     this.loadStates(); }
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })
   ngOnInit(): void {
  }

   loadStates() {
      var allStates = 'admin, admin@techbots.com'
      this.states =  allStates.split(/, +/g).map( function (state) {
         return {
            value: state,
            display: state
         };
      });
   }
   openSnackBar(message: string, action: string) {
    if(this.succ){
      this.snackBar.open(message, action, {
         duration: 5000,
         verticalPosition: 'top' ,
         horizontalPosition: 'center' ,

      });
    }
   } 
 
   login() {
     
      this.errorMessage = null;
      this.successMessage = null;
      // if(this.loginForm.username.value&&)
      // this.router.navigate(['/dashboard']);
      this.succ=false;
      this.loginservice.auth(this.loginForm.value.username,this.loginForm.value.password).subscribe(
         (success)=>{
            console.log(success)
            this.succ=true;
         },
         (error)=>{
            console.log(error)
             this.errorMessage="Wrong username or Password"}
      )
      console.log(this.loginForm.value)
      // if((this.loginForm.value.username=="admin"||this.loginForm.value.username=="admin@irs.in")&&this.loginForm.value.pass=="admin")
      // this.router.navigate(['/dashboard']);
      // else
     
    }
}
