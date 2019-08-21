import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { GroceryService } from 'src/app/services/grocery.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as firebase from 'firebase';

import { PhoneNumber } from 'src/app/module/phone';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
//  for phone
windowRef: any;
phoneNumber = new PhoneNumber();
verificationCode: string;
user: any;
  
  validations_form: FormGroup;
  errorMessage: string = '';
  // formBuilder: any;
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public alertCtrl:AlertController,
   
    
  ) { }
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

    // for phone
    this.windowRef = this.authService.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  reset(value){
    this.authService.reset(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/edit');
    }, err => {
      this.errorMessage = err.message;
    })
  }
  loginWithNumber(value){
    this.authService.loginWithNumber(value)
    // .then(res => {
    //   console.log(res);
    //   this.errorMessage = "";
    //   this.navCtrl.navigateForward('/edit');
    // }, err => {
    //   this.errorMessage = err.message;
    // })
  }
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/home');
    }, err => {
      this.errorMessage = err.message;
    })
  }
  loginWithGoogle(value){
    this.authService.loginWithGoogle()
    .then(
      res=>{
        console.log(res);
        this.errorMessage="success", "Successfully Logged In with Google";
        this.navCtrl.navigateForward('/home');

      },err=>{
        this.errorMessage="danger", err.message;
      }
    )
  }
  facebookLogin(value){
    this.authService.facebookLogin()
    .then(
      res=>{
        console.log(res);
        this.errorMessage="success", "Successfully Logged In with Facebook";
        this.navCtrl.navigateForward('/home');

      },err=>{
        this.errorMessage="danger", err.message;
      }
    )
  }
//  for phone
sendLoginCode() {

  const appVerifier = this.windowRef.recaptchaVerifier;

  const num = this.phoneNumber.e164;

  firebase.auth().signInWithPhoneNumber(num, appVerifier)
          .then(result => {

              this.windowRef.confirmationResult = result;

          })
          .catch( error => console.log(error) );

}

verifyLoginCode() {
  this.windowRef.confirmationResult
                .confirm(this.verificationCode)
                .then( result => {

                  this.user = result.user;
                  this.navCtrl.navigateForward('/item');
  })
  .catch( error => console.log(error, "Incorrect code entered?"));
}
  
  goToRegisterPage(){
    this.navCtrl.navigateForward('/sign-up');
  }
}
