import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// import { resolve } from 'path';
// import { reject } from 'q';
import { AlertController } from '@ionic/angular';
// import { verify } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public alertCtrl:AlertController) { }
  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
   applicationVerifier:any;
   provider:any;
   reset(value){
    return new Promise<any>((resolve, reject) => {
    firebase.auth().sendPasswordResetEmail(value)
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    })}
    loginWithNumber(value){
     this. applicationVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container',firebase.auth().signInWithPhoneNumber);
  //     return new Promise<any>((resolve, reject) => {
  //     // firebase.auth().verifyPhoneNumber('+123456789', '30000')
  //     firebase.auth().signInWithPhoneNumber(value.email,this.applicationVerifier)
  // .then((res: any) => console.log(res))
  // .catch((error: any) => console.error(error));
  //    })
}

   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  //  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
   loginWithGoogle(){
     return new Promise<any>((resolve,reject)=>{
       firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
       .then(
         res=> resolve(res),
         err =>reject(err)
       )
     })
   }
   loginWithGitHub(){
    return new Promise<any>((resolve,reject)=>{
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(
        res=> resolve(res),
        err =>reject(err)
      )
      
    })
  }
  facebookLogin() {
    return new Promise<any>((resolve,reject)=>{
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
        res=> resolve(res),
        err =>reject(err)
      )
      
    })
  }
   
   logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
//  for phone
get windowRef() {
  return window
}

  
  userDetails(){
    return firebase.auth().currentUser;
  }
}
