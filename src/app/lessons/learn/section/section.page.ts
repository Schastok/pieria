//import { Component, OnInit} from '@angular/core';
// import {
//   Component,
//   OnInit,
//   ViewEncapsulation,
//   AfterViewInit,
//   ViewChild,
//   ElementRef,
// } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../../api.service';
// import { IonContent } from '@ionic/angular';
// import { IonicSlides } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
// // import {
// //   AdMobFree,
// //   AdMobFreeBannerConfig,
// //   AdMobFreeInterstitialConfig,
// //   AdMobFreeRewardVideoConfig,
// // } from '@ionic-native/admob-free/ngx';
// import { Location } from '@angular/common';
// import Swiper from 'swiper';
// // import 'swiper/css';
// // import 'swiper/css/navigation';
// @Component({
//   selector: 'app-section',
//   templateUrl: './section.page.html',
//   styleUrls: ['./section.page.scss'],
//   standalone: false,
// })
// export class SectionPage implements OnInit {
//   mySwiper: Swiper; // Swiper instance
//   available = true;
//   disablePrevBtn = true;
//   disableNextBtn = true;
//   didInit = false;
//   sectionId;
//   sectiondetails;
//   ready = false;

//   slideConfig = {
//     slidesPerView: 1,
//     centeredSlides: true,
//     autoHeight: true,
//   };

//   @ViewChild('IonicSlides', { static: false }) slides: any;
//   @ViewChild(IonContent) IonContent: IonContent;

//   constructor(
//     // private admobFree: AdMobFree,
//     private activatedRoute: ActivatedRoute,
//     private storage: Storage,
//     private apiService: ApiService,
//     private router: Router,
//     private location: Location
//   ) {}

//   ngAfterViewInit() {
//     this.didInit = true;
//     /*
//       let interstitialConfig: AdMobFreeInterstitialConfig = {
//           isTesting: true, // Remove in production
//           autoShow: true//,
//           //id: "ca-app-pub-3940256099942544/6300978111"
//       };
//       this.admobFree.interstitial.config(interstitialConfig);
//       this.admobFree.interstitial.prepare().then(() => {
//       }).catch(e => alert(e));
//       */
//   }

//   ionViewDidEnter() {
//     this.slides.lockSwipes(true);
//     this.slides.getActiveIndex().then((data) => {
//       console.log('INDEX: ', data);
//     });
//   }

//   ngOnInit() {
//     this.activatedRoute.paramMap.subscribe((paramMap) => {
//       if (!paramMap.has('sectionId')) {
//         //redirect
//         return;
//       }
//       this.sectionId = paramMap.get('sectionId');
//     });

//     this.apiService.getSection_details(this.sectionId).subscribe(
//       (data) => {
//         console.log('SECTION DETAILS');
//         if (Object.values(data).length >= 2) {
//           this.disableNextBtn = false;
//           //this.storage.set('section_' + this.sectionId + '_done', 0);
//         } else {
//           this.storage.set('section_' + this.sectionId + '_done', 1);
//         }

//         this.sectiondetails = data;
//         for (let slide of this.sectiondetails) {
//           if (slide.type == 'text') {
//             //          slide.content = slide.content.replace(new RegExp('<img style="(.+?)"(.+?)width="(.+?)" height="(.+?)">', 'g'), '<img style="$1width=$3;height=$4;" $2>', 'g');
//             slide.content = slide.content.replace(
//               new RegExp(
//                 '<img style="(.+?)"(.+?)width="(.+?)" height="(.+?)".+?>',
//                 'g'
//               ),
//               '<img $2 style="$1width:$3px;height:$4px;">',
//               'g'
//             );
//             slide.content = slide.content.replace(
//               new RegExp(
//                 '<img src="(.+?)"(.+?)width="(.+?)" height="(.+?)".+?>',
//                 'g'
//               ),
//               '<img src="$1" $2 style="width:$3px;height:$4px;">',
//               'g'
//             );
//             slide.content = slide.content.replace(
//               new RegExp('href="#', 'g'),
//               'href="' + this.router.url + '#',
//               'g'
//             );
//             if (this.apiService.TEST) {
//               slide.content = slide.content.replace(
//                 new RegExp('../../media/', 'g'),
//                 'http://localhost:8000/media/',
//                 'g'
//               );
//               //slide.content = slide.content.replace(new RegExp('https://www.e-fluent.com/media/', 'g'), 'http://localhost:8000/media/', 'g');
//             } else {
//               slide.content = slide.content.replace(
//                 new RegExp('../../media/', 'g'),
//                 'https://www.e-fluent.com/media/',
//                 'g'
//               );
//             }
//           }
//         }
//         //this.sectiondetails = this.html.replace(new RegExp('/media/', 'g'), 'https://www.e-fluent.com/media/', 'g');
//         //console.log(this.sectiondetails);
//         this.ready = true;
//       },

//       (err) => {
//         if (err == 403) {
//           console.log('not authorized. Please change to premium');
//           this.available = false;
//         }
//         console.log('getData has thrown and error of', err);
//       }
//     );
//   }

//   ncheck() {
//     this.slides.getActiveIndex().then((index: number) => {
//       let pageindex = index.toString();

//       const ncheck = document.getElementsByClassName('ncheck');
//       console.log(ncheck.length);
//       var disablenext = false;
//       if (ncheck.length > 0) {
//         var disablenext = false;
//         for (let i = 0; i < ncheck.length; i++) {
//           console.log(ncheck[i]);
//           if (ncheck[i].id.startsWith('n' + pageindex)) {
//             if (!ncheck[i].hasAttribute('viewed')) {
//               disablenext = true;
//               console.log('disabled because !viewed ', disablenext);
//             } else if (ncheck[i].getAttribute('viewed') == 'false') {
//               disablenext = true;
//               console.log('disabled because viewed=false ', disablenext);
//             } else {
//             }
//             console.log('disabled: ', disablenext);
//           } else {
//           }
//         }

//         if (disablenext) {
//           let next = document.getElementById('nav-next');
//           next.setAttribute('disabled', 'true');
//           console.log('next button disabled');
//         } else {
//           let next = document.getElementById('nav-next');
//           next.setAttribute('disabled', 'false');
//         }
//       }
//     });
//   }

//   next() {
//     console.log(this.slides.lockSwipes(false));
//     this.slides.lockSwipes(false);
//     console.log(this.slides);
//     this.slides.slideNext();
//     console.log('next');
//     this.IonContent.scrollToTop();
//     this.slides.lockSwipes(true);
//     this.doCheck();
//     this.slides.getActiveIndex().then((index: number) => {
//       console.log(index);
//       let pageindex = index.toString();

//       const ncheck = document.getElementsByClassName('ncheck');
//       var disablenext = false;
//       if (ncheck.length > 0) {
//         var disablenext = false;
//         console.log('disablenext ', disablenext);
//         for (let i = 0; i < ncheck.length; i++) {
//           console.log('Nchecklrgth', ncheck[i]);
//           ncheck[i].addEventListener('click', (event: Event) => {
//             let target = event.target as HTMLElement;
//             target.setAttribute('viewed', 'true');
//             this.ncheck();
//           });
//           if (ncheck[i].id.startsWith('n' + pageindex)) {
//             if (!ncheck[i].hasAttribute('viewed')) {
//               disablenext = true;
//               console.log('viewed, disabled');
//             } else if (ncheck[i].getAttribute('viewed') == 'false') {
//               disablenext = true;
//               console.log('viewed, disabled');
//             } else {
//             }
//           } else {
//           }
//         }

//         if (disablenext) {
//           let next = document.getElementById('nav-next');
//           next.setAttribute('disabled', 'true');
//           console.log('next button disabled');
//         } else {
//           let next = document.getElementById('nav-next');
//           next.setAttribute('disabled', 'false');
//         }
//       }
//     });
//   }

//   back() {
//     this.slides.lockSwipes(false);
//     this.slides.slidePrev();
//     this.IonContent.scrollToTop();
//     this.slides.lockSwipes(true);
//     this.doCheck();
//     if (!this.disableNextBtn) {
//       let next = document.getElementById('nav-next');
//       next.setAttribute('disabled', 'false');
//     }
//   }

//   doCheck() {
//     let prom1 = this.slides.isBeginning();
//     let prom2 = this.slides.isEnd();
//     prom2.then((istrue) => {
//       console.log(istrue);
//       if (istrue) {
//         this.storage.set(
//           this.apiService.STUDENT_ID + '_section_' + this.sectionId + '_done',
//           1
//         );
//         console.log('section done');
//       } else {
//         console.log('section not done');
//       }
//     });

//     Promise.all([prom1, prom2]).then((data) => {
//       data[0] ? (this.disablePrevBtn = true) : (this.disablePrevBtn = false);
//       data[1] ? (this.disableNextBtn = true) : (this.disableNextBtn = false);
//     });
//   }
// }

// import {
//   Component,
//   OnInit,
//   AfterViewInit,
//   ViewChild,
//   ElementRef,
// } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../../api.service';
// import { IonContent } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
// // Removed IonicSlides import as we're replacing it with Swiper
// import { Location } from '@angular/common';
// import Swiper from 'swiper';
// // import 'swiper/css';

// @Component({
//   selector: 'app-section',
//   templateUrl: './section.page.html',
//   styleUrls: ['./section.page.scss'],
//   standalone: false,
// })
// export class SectionPage implements OnInit, AfterViewInit {
//   available = true;
//   disablePrevBtn = true;
//   disableNextBtn = true;
//   didInit = false;
//   sectionId;
//   sectiondetails;
//   ready = false;
//   slideConfig = {
//     slidesPerView: 1,
//     centeredSlides: true,
//     autoHeight: true,
//   };

//   // Remove IonicSlides and use a ViewChild reference for the Swiper container
//   @ViewChild('swiperContainer', { static: false }) swiperContainer: ElementRef;
//   @ViewChild(IonContent) ionContent: IonContent;

//   // This property will act as a shim replacing the IonicSlides API
//   slides: any;

//   // Swiper instance reference
//   swiperInstance: Swiper;

//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private storage: Storage,
//     private apiService: ApiService,
//     private router: Router,
//     private location: Location
//   ) {}

//   ngAfterViewInit() {
//     this.didInit = true;
//     // We will initialize Swiper after section details load
//   }

//   ionViewDidEnter() {
//     // Lock swipes on view enter if slides have been initialized
//     if (this.slides && this.slides.lockSwipes) {
//       this.slides.lockSwipes(true);
//     }
//   }

//   ngOnInit() {
//     this.activatedRoute.paramMap.subscribe((paramMap) => {
//       if (!paramMap.has('sectionId')) {
//         // redirect or handle error
//         return;
//       }
//       this.sectionId = paramMap.get('sectionId');
//     });

//     this.apiService.getSection_details(this.sectionId).subscribe(
//       (data) => {
//         console.log('SECTION DETAILS');
//         if (Object.values(data).length >= 2) {
//           this.disableNextBtn = false;
//         } else {
//           this.storage.set('section_' + this.sectionId + '_done', 1);
//         }

//         this.sectiondetails = data;
//         for (let slide of this.sectiondetails) {
//           if (slide.type === 'text') {
//             slide.content = slide.content.replace(
//               new RegExp(
//                 '<img style="(.+?)"(.+?)width="(.+?)" height="(.+?)".+?>',
//                 'g'
//               ),
//               '<img $2 style="$1width:$3px;height:$4px;">',
//               'g'
//             );
//             slide.content = slide.content.replace(
//               new RegExp(
//                 '<img src="(.+?)"(.+?)width="(.+?)" height="(.+?)".+?>',
//                 'g'
//               ),
//               '<img src="$1" $2 style="width:$3px;height:$4px;">',
//               'g'
//             );
//             slide.content = slide.content.replace(
//               new RegExp('href="#', 'g'),
//               'href="' + this.router.url + '#',
//               'g'
//             );
//             if (this.apiService.TEST) {
//               slide.content = slide.content.replace(
//                 new RegExp('../../media/', 'g'),
//                 'http://localhost:8000/media/',
//                 'g'
//               );
//             } else {
//               slide.content = slide.content.replace(
//                 new RegExp('../../media/', 'g'),
//                 'https://www.e-fluent.com/media/',
//                 'g'
//               );
//             }
//           }
//         }
//         this.ready = true;
//         // Delay initialization slightly to ensure the view is updated
//         setTimeout(() => {
//           this.initSwiper();
//         }, 100);
//       },
//       (err) => {
//         if (err === 403) {
//           console.log('not authorized. Please change to premium');
//           this.available = false;
//         }
//         console.log('getData has thrown an error of', err);
//       }
//     );
//   }

//   // Initialize Swiper and create a shim matching the expected API
//   initSwiper() {
//     if (this.swiperContainer && this.swiperContainer.nativeElement) {
//       this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
//         slidesPerView: 1,
//         autoHeight: true,
//       });
//       // Create a shim for slides to support lockSwipes, slideNext, slidePrev, getActiveIndex
//       this.slides = {
//         lockSwipes: (lock: boolean) => {
//           this.swiperInstance.allowSlideNext = !lock;
//           this.swiperInstance.allowSlidePrev = !lock;
//           return Promise.resolve();
//         },
//         slideNext: () => {
//           this.swiperInstance.slideNext();
//         },
//         slidePrev: () => {
//           this.swiperInstance.slidePrev();
//         },
//         getActiveIndex: () => {
//           return Promise.resolve(this.swiperInstance.activeIndex);
//         },
//       };
//       // Lock swipes initially
//       this.slides.lockSwipes(true);
//     }
//   }

//   ncheck() {
//     this.slides.getActiveIndex().then((index: number) => {
//       let pageindex = index.toString();
//       const ncheck = document.getElementsByClassName('ncheck');
//       console.log(ncheck.length);
//       let disablenext = false;
//       if (ncheck.length > 0) {
//         for (let i = 0; i < ncheck.length; i++) {
//           console.log(ncheck[i]);
//           if (ncheck[i].id.startsWith('n' + pageindex)) {
//             if (!ncheck[i].hasAttribute('viewed')) {
//               disablenext = true;
//               console.log('disabled because !viewed ', disablenext);
//             } else if (ncheck[i].getAttribute('viewed') === 'false') {
//               disablenext = true;
//               console.log('disabled because viewed=false ', disablenext);
//             }
//             console.log('disabled: ', disablenext);
//           }
//         }
//         const next = document.getElementById('nav-next');
//         if (disablenext) {
//           next.setAttribute('disabled', 'true');
//           console.log('next button disabled');
//         } else {
//           next.setAttribute('disabled', 'false');
//         }
//       }
//     });
//   }

//   next() {
//     this.slides.lockSwipes(false);
//     this.slides.slideNext();
//     console.log('next');
//     this.ionContent.scrollToTop();
//     this.slides.lockSwipes(true);
//     this.doCheck();
//     this.slides.getActiveIndex().then((index: number) => {
//       console.log(index);
//       let pageindex = index.toString();
//       const ncheck = document.getElementsByClassName('ncheck');
//       let disablenext = false;
//       if (ncheck.length > 0) {
//         for (let i = 0; i < ncheck.length; i++) {
//           console.log('Ncheck length', ncheck[i]);
//           ncheck[i].addEventListener('click', (event: Event) => {
//             let target = event.target as HTMLElement;
//             target.setAttribute('viewed', 'true');
//             this.ncheck();
//           });
//           if (ncheck[i].id.startsWith('n' + pageindex)) {
//             if (!ncheck[i].hasAttribute('viewed')) {
//               disablenext = true;
//               console.log('viewed, disabled');
//             } else if (ncheck[i].getAttribute('viewed') === 'false') {
//               disablenext = true;
//               console.log('viewed, disabled');
//             }
//           }
//         }
//         const next = document.getElementById('nav-next');
//         if (disablenext) {
//           next.setAttribute('disabled', 'true');
//           console.log('next button disabled');
//         } else {
//           next.setAttribute('disabled', 'false');
//         }
//       }
//     });
//   }

//   back() {
//     this.slides.lockSwipes(false);
//     this.slides.slidePrev();
//     this.ionContent.scrollToTop();
//     this.slides.lockSwipes(true);
//     this.doCheck();
//     if (!this.disableNextBtn) {
//       const next = document.getElementById('nav-next');
//       next.setAttribute('disabled', 'false');
//     }
//   }

//   doCheck() {
//     let prom1 = this.slides
//       .getActiveIndex()
//       .then((index: number) => index === 0);
//     let prom2 = Promise.resolve(
//       this.swiperInstance ? this.swiperInstance.isEnd : false
//     );
//     prom2.then((istrue) => {
//       console.log(istrue);
//       if (istrue) {
//         this.storage.set(
//           this.apiService.STUDENT_ID + '_section_' + this.sectionId + '_done',
//           1
//         );
//         console.log('section done');
//       } else {
//         console.log('section not done');
//       }
//     });
//     Promise.all([prom1, prom2]).then((data) => {
//       data[0] ? (this.disablePrevBtn = true) : (this.disablePrevBtn = false);
//       data[1] ? (this.disableNextBtn = true) : (this.disableNextBtn = false);
//     });
//   }

//   // Optional convenience wrappers (if needed)
//   nextSlide() {
//     this.next();
//   }
//   prevSlide() {
//     this.back();
//   }
// }

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
  standalone: false,
})
export class SectionPage implements OnInit, AfterViewInit {
  available = true;
  disablePrevBtn = true;
  disableNextBtn = true;
  didInit = false;
  sectionId;
  sectiondetails;
  ready = false;

  slideConfig = {
    slidesPerView: 1,
    centeredSlides: true,
    autoHeight: true,
  };

  mySwiper: Swiper | undefined;

  @ViewChild('swiperContainer', { static: false, read: ElementRef })
  swiperContainer: ElementRef | undefined;
  @ViewChild(IonContent, { static: false }) IonContent: IonContent | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  ngAfterViewInit() {
    this.didInit = true;
    if (this.swiperContainer?.nativeElement) {
      this.mySwiper = new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 1,
        centeredSlides: true,
        autoHeight: true,
      });

      this.mySwiper.allowTouchMove = false;

      console.log('Swiper initialized with index:', this.mySwiper.activeIndex);
    } else {
      console.error('Swiper container not found!');
      this.mySwiper = new Swiper(this.swiperContainer?.nativeElement, {
        slidesPerView: 1,
        centeredSlides: true,
        autoHeight: true,
      });
    }
  }

  ionViewDidEnter() {
    if (this.mySwiper) {
      this.mySwiper.allowTouchMove = false;
      console.log('Active Index:', this.mySwiper.activeIndex);
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('sectionId')) {
        // redirect if sectionId is missing
        return;
      }
      this.sectionId = paramMap.get('sectionId');
    });

    this.apiService.getSection_details(this.sectionId).subscribe(
      (data) => {
        console.log('SECTION DETAILS');
        if (Object.values(data).length >= 2) {
          this.disableNextBtn = false;
        } else {
          this.storage.set('section_' + this.sectionId + '_done', 1);
        }

        this.sectiondetails = data;
        for (let slide of this.sectiondetails) {
          if (slide.type === 'text') {
            slide.content = slide.content.replace(
              new RegExp(
                '<img style="(.+?)"(.+?)width="(.+?)" height="(.+?)".+?>',
                'g'
              ),
              '<img $2 style="$1width:$3px;height:$4px;">',
              'g'
            );
            slide.content = slide.content.replace(
              new RegExp(
                '<img src="(.+?)"(.+?)width="(.+?)" height="(.+?)".+?>',
                'g'
              ),
              '<img src="$1" $2 style="width:$3px;height:$4px;">',
              'g'
            );
            slide.content = slide.content.replace(
              new RegExp('href="#', 'g'),
              'href="' + this.router.url + '#',
              'g'
            );
            if (this.apiService.TEST) {
              slide.content = slide.content.replace(
                new RegExp('../../media/', 'g'),
                'http://localhost:8000/media/',
                'g'
              );
            } else {
              slide.content = slide.content.replace(
                new RegExp('../../media/', 'g'),
                'https://www.e-fluent.com/media/',
                'g'
              );
            }
          }
        }
        this.ready = true;
      },
      (err) => {
        if (err === 403) {
          console.log('Not authorized. Please change to premium');
          this.available = false;
        }
        console.log('getData has thrown an error of', err);
      }
    );
  }

  ncheck() {
    let index = this.mySwiper.activeIndex;
    let pageindex = index.toString();

    const ncheck = document.getElementsByClassName('ncheck');
    console.log(ncheck.length);
    let disablenext = false;
    if (ncheck.length > 0) {
      for (let i = 0; i < ncheck.length; i++) {
        console.log(ncheck[i]);
        if (ncheck[i].id.startsWith('n' + pageindex)) {
          if (
            !ncheck[i].hasAttribute('viewed') ||
            ncheck[i].getAttribute('viewed') === 'false'
          ) {
            disablenext = true;
            console.log('disabled because not viewed or false', disablenext);
          }
          console.log('disabled: ', disablenext);
        }
      }

      let next = document.getElementById('nav-next');
      if (disablenext) {
        next.setAttribute('disabled', 'true');
        console.log('next button disabled');
      } else {
        next.setAttribute('disabled', 'false');
      }
    }
  }

  next() {
    if (!this.mySwiper) {
      console.error('Swiper instance is undefined.');
      this.mySwiper = new Swiper(this.swiperContainer?.nativeElement, {
        slidesPerView: 1,
        centeredSlides: true,
        autoHeight: true,
      });
      return;
    }
    console.log(this.mySwiper);
    this.mySwiper.allowTouchMove = true;
    this.mySwiper?.slideNext();
    this.mySwiper.allowTouchMove = false;

    this.IonContent?.scrollToTop();
    this.doCheck();

    let index = this.mySwiper.activeIndex;
    console.log(index);
    let pageindex = index.toString();

    const ncheck = document.getElementsByClassName('ncheck');
    let disablenext = false;
    if (ncheck.length > 0) {
      console.log('disablenext ', disablenext);
      for (let i = 0; i < ncheck.length; i++) {
        console.log('ncheck', ncheck[i]);
        ncheck[i].addEventListener('click', (event: Event) => {
          let target = event.target as HTMLElement;
          target.setAttribute('viewed', 'true');
          this.ncheck();
        });
        if (ncheck[i].id.startsWith('n' + pageindex)) {
          if (
            !ncheck[i].hasAttribute('viewed') ||
            ncheck[i].getAttribute('viewed') === 'false'
          ) {
            disablenext = true;
            console.log('viewed, disabled');
          }
        }
      }
      let nextBtn = document.getElementById('nav-next');
      if (disablenext) {
        nextBtn.setAttribute('disabled', 'true');
        console.log('next button disabled');
      } else {
        nextBtn.setAttribute('disabled', 'false');
      }
    }
  }

  back() {
    if (!this.mySwiper) {
      console.error('Swiper instance is undefined.');
      return;
    }

    this.mySwiper.allowTouchMove = true;
    this.mySwiper.slidePrev();
    this.mySwiper.allowTouchMove = false;

    this.IonContent?.scrollToTop();
    this.doCheck();
    if (!this.disableNextBtn) {
      let next = document.getElementById('nav-next');
      next.setAttribute('disabled', 'false');
    }
  }

  doCheck() {
    if (!this.mySwiper) return;
    const isBeginning = this.mySwiper.isBeginning;
    const isEnd = this.mySwiper.isEnd;
    console.log(isEnd);
    if (isEnd) {
      this.storage.set(
        this.apiService.STUDENT_ID + '_section_' + this.sectionId + '_done',
        1
      );
      console.log('section done');
    } else {
      console.log('section not done');
    }

    this.disablePrevBtn = isBeginning;
    this.disableNextBtn = isEnd;
  }
}
