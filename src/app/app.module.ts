import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
// import { FlipModule } from 'ngx-flip';
// import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Media } from '@awesome-cordova-plugins/media/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpClient,
    NativeAudio,
    InAppBrowser,
    File,
    Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
