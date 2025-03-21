import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { StatusBar } from '@capacitor/status-bar';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

import { Router, NavigationExtras } from '@angular/router';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register();
// import {
//   AdMobFree,
//   AdMobFreeBannerConfig,
//   AdMobFreeInterstitialConfig,
//   AdMobFreeRewardVideoConfig,
// } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.page.html',
  styleUrls: ['./mycourses.page.scss'],
  standalone: false,
})
export class MycoursesPage implements OnInit {
  courses;
  ready = false;
  empty = false;
  constructor(
    // private admobFree: AdMobFree,
    private router: Router,
    private apiService: ApiService,

    private platform: Platform,
    private routerOutlet: IonRouterOutlet // private navigationBar: NavigationBar, // private statusBar: StatusBar
  ) {
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   console.log('HW button pressed, exiting....');
    //   App.exitApp();
    // });
  }

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setBackgroundColor({ color: '#005f69' });
    }
  }

  ngAfterViewInit() {
    /*

    let bannerConfig: AdMobFreeBannerConfig = {
              isTesting: true, // Remove in production
              autoShow: true//,
              //id: "ca-app-pub-3940256099942544/6300978111"
          };
          this.admobFree.banner.config(bannerConfig);

          this.admobFree.banner.prepare().then(() => {
              // success
          }).catch(e => alert(e));
 */
  }

  ionViewWillEnter() {
    this.apiService.getstudentcls().subscribe((data) => {
      console.log(data);
      this.courses = data;
      this.apiService.CLASSROOM_DATA = data;
      this.ready = true;
      if(this.courses.length === 0){
        this.empty = true;
      }
    });
  }

  enter_cl(cl_id) {
    this.apiService.CLASSROOM_ID = cl_id;
    this.router.navigate(['/lessons']);
  }

  all_cl() {
    let objToSend: NavigationExtras = this.courses;
    this.router.navigate(['/courses'], {
      state: { mycourses: objToSend },
    });
  }
}
