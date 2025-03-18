import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
//import { NavigationBarColor } from 'ionic-plugin-navigation-bar-color';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

//import { AudioService } from '../services/audio.service';
// import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Location } from '@angular/common';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
  standalone: false,
})
export class LessonsPage {
  cl_index;
  lessons;
  ready = false;
  lessonprogress = {};
  didInit = false;
  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
  };
  course;
  Classroom_name;
  Classroom_description;
  constructor(
    // private admobFree: AdMobFree,
    private apiService: ApiService,
    private storage: Storage,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    // private navigationBar: NavigationBar,
    // private statusBar: StatusBar,
    private location: Location
  ) {
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   console.log('HW button pressed, exiting....');
    //   App.exitApp();
    // });
    this.storage.create();
  }

  ngAfterViewInit() {
    this.didInit = true;
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setBackgroundColor({ color: '#005f69' });
    }

    this.course = this.apiService.CLASSROOM_DATA;
    for (let i = 0; i < this.course.length; i++) {
      if (this.course[i].Classroom_ID === this.apiService.CLASSROOM_ID) {
        this.cl_index = i;
      }
    }
    this.Classroom_name = this.course[this.cl_index]['Classroom_name'];
    this.Classroom_description =
      this.course[this.cl_index]['Classroom_description'];
    console.log('This is the course');
    console.log(this.apiService.CLASSROOM_DATA);
    console.log(this.apiService.CLASSROOM_ID);
    this.apiService.getLessons().subscribe((data) => {
      console.log(data);
      this.lessons = data;
      console.log(this.lessons);

      let l_arr = Object.keys(this.lessons);
      for (let i = 0; i < l_arr.length; i++) {
        let lessonid = this.lessons[l_arr[i]].Lessons_ID;
        this.lessonprogress[lessonid] = 0;

        this.storage.get(this.apiService.STUDENT_ID + '_prog_' + lessonid).then(
          (val) => {
            console.log('progress found for lesson ', lessonid);
            console.log('progress: ', val);
            if (val === null) {
              val = 0;
            }
            this.lessonprogress[lessonid] = val;
            console.log(this.lessonprogress);
          },
          (error) => console.log(error)
        );
      }

      this.ready = true;
    });
  }

  goBack() {
    this.location.back();
  }
}
