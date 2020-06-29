import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';



const config = {
  apiKey: "AIzaSyCvhiBpfjIB8nkZjAxb7WYmg8FuoeJhL9I",
  authDomain: "ionic-apartment-auditing.firebaseapp.com",
  databaseURL: "https://ionic-apartment-auditing.firebaseio.com",
  projectId: "ionic-apartment-auditing",
  storageBucket: "ionic-apartment-auditing.appspot.com",
  messagingSenderId: "165790949527",
  appId: "1:165790949527:web:6f32549abfccf8e64049d2"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
