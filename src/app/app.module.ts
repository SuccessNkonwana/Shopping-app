import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
  import { environment } from 'src/environments/environment';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9xkLKhAqTWzuwVMtphHJnrAepR92Vpmo",
  authDomain: "shoppingapp-a7813.firebaseapp.com",
  databaseURL: "https://shoppingapp-a7813.firebaseio.com",
  projectId: "shoppingapp-a7813",
  storageBucket: "shoppingapp-a7813.appspot.com",
  messagingSenderId: "401464300289",
  appId: "1:401464300289:web:ab12d2b21e7233e2"
};
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            AngularFireAuthModule,
            IonicModule.forRoot(),
             AppRoutingModule,
             ReactiveFormsModule,
             AngularFireModule.initializeApp(firebaseConfig),
             AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
