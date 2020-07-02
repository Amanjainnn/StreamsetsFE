import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    //Data Declarations
    registerForm:FormGroup;
    private signUpSubscribe:Subscription;
  
    constructor(private formbuilder: FormBuilder,
                private snack: MatSnackBar,
                private user : LoginService,
                private route : Router ) { }

  ngOnInit(): void {

     //Building the form variables
     this.registerForm = this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      confirmPass:['',Validators.required],
      email:['',Validators.required],
      organization:['',Validators.required]
    })
  }

  //Handling OnSubmit function
  onSubmit(){
    const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    //Checking password and confirm password
    if(this.registerForm.get('password').value !== this.registerForm.get('confirmPass').value){
      this.snack.open("Password and Confirm password should be same",'',{
        duration: 2500,
        panelClass: ["error"]
      })
      return;
    }

    //Email validation
    if(!reg.test(this.registerForm.get("email").value)){
      this.snack.open("Invalid Email format",'',{
        duration: 2500,
        panelClass: ["error"]
      })
      return;
    }

    //Data to send to backend
    const data = {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      organization: this.registerForm.get('organization').value,
      email: this.registerForm.get('email').value
    }

    //Calling function to register a new user
    this.signUpSubscribe = this.user.registerUser(data).subscribe(
      data =>{
        this.snack.open("User successfully registered",'',{
          duration: 4000,
          panelClass: ["success"]
        });
        this.route.navigate(['login']);
      },
      err =>{
        this.snack.open(err.message || 'Connection failed','',{
          duration: 2000,
          panelClass: ["error"]
        })
      }
    )
    
  }

}


