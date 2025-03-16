import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
// import {
//   AdMobFree,
//   AdMobFreeBannerConfig,
//   AdMobFreeInterstitialConfig,
//   AdMobFreeRewardVideoConfig,
// } from '@ionic-native/admob-free/ngx';

//import { AudioService } from '../../../services/audio.service';

//import { FlipModule } from 'ngx-flip';

//Array.prototype.remove = function() {
//    var what, a = arguments, L = a.length, ax;
//    while (L && this.length) {
//        what = a[--L];
//        while ((ax = this.indexOf(what)) !== -1) {
//            this.splice(ax, 1);
//        }
//    }
//    return this;
//};

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

@Component({
  selector: 'app-do-set',
  templateUrl: './do-set.page.html',
  styleUrls: ['./do-set.page.scss'],
  standalone: false,
})
export class DoSetPage implements OnInit {
  lessonId;
  flipcardset;
  labelColor;
  empList = [];
  iscorrect;
  showid;
  currentcard;
  showside;
  finished;
  random;
  timer = 5;
  timer2 = 15;
  timerstart = false;
  timerend = false;
  loading;

  constructor(
    // private admobFree: AdMobFree,
    private nativeAudio: NativeAudio,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    this.nativeAudio.preloadSimple('splash', 'assets/audio/water1.wav');
    this.nativeAudio.preloadSimple('success', 'assets/audio/success.mp3');
    this.nativeAudio.preloadSimple('fail', 'assets/audio/fail.wav');

    console.log('ngOnInit called');
    this.random = Math.random() < 0.5;
    this.loading = true;

    this.showside = 0;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('lessonId')) {
        //redirect
        return;
      }
      this.lessonId = paramMap.get('lessonId');
    });

    this.apiService.getFlipcardset(this.lessonId).subscribe(
      (data) => {
        const set = Object.values(data);
        console.log('data pulled: ');
        console.log(set);
        //this.flipcardset = set.filter(t=>t.multiplechoice_possible === 0);
        this.flipcardset = set.filter((item) => {
          if (
            (item.multiplechoice_possible === 1 || item.entry_possible === 1) &&
            item.Status < 5
          ) {
            return true;
          }
          return false;
        });
        console.log('flipcarset init: ');
        console.log(this.flipcardset);
        this.timerstart = true;
        this.timerend = false;
        setTimeout(() => {
          this.countdown(this.timer);
        }, 1000);
        if (this.flipcardset.length != 0) {
          this.currentcard = this.flipcardset[0];
          this.showid = this.currentcard.flipcardID;
          console.log('showid: ');
          console.log(this.showid);
        } else {
          this.location.back();
        }
        this.loading = false;
        this.finished = false;
      },
      (error) => {
        let err = error.status as number;
        console.log('is there an error: ');
        if ([401, 404].indexOf(err) >= 0) {
          console.log('re-route');
          this.router.navigate(['/authenticate']);
        }
      }
    );
  }

  countdown(x) {
    if (this.timerend == true) {
      return;
    }
    let card = this.currentcard;
    if (
      card.multiplechoice_possible == 1 &&
      card.entry_possible == 1 &&
      this.random == true
    ) {
      if (this.timerstart == true) {
        x = this.timer2;
        this.timerstart = false;
      }
    }

    if (x < 0) {
      console.log('click ', 'card_' + this.showid);
      x = this.timer;
      this.changeshowside(x);
      return x;
    } else {
      let el = document.getElementById('timer');
      if (el !== null) {
        console.log(el);
        el.innerHTML = x;
        x--;
      } else {
        return;
      }

      setTimeout(() => {
        this.countdown(x);
      }, 1000);
    }
  }

  checkanswer(answer, event, correct) {
    console.log(window.getComputedStyle(event.target).background);
    console.log(event.target.getAttribute('ticked'));
    if (event.target.getAttribute('ticked') === 'true') {
      this.renderer.setStyle(
        event.target,
        'background-color',
        'rgba(106, 101, 101, 0.2)'
      );
      this.renderer.setAttribute(event.target, 'ticked', 'false');
      remove(this.empList, answer);
    } else {
      this.renderer.setStyle(event.target, 'background-color', '#72d6e1ff');
      this.renderer.setAttribute(event.target, 'ticked', 'true');
      console.log(this.empList);
      this.empList.push(answer);
      console.log(this.empList);
    }
    const arr1 = this.empList.sort();
    const arr2 = correct.sort();
    this.iscorrect = JSON.stringify(arr1) === JSON.stringify(arr2);

    console.log(this.empList.sort());
    console.log(correct.sort());
    console.log(this.iscorrect);

    this.earlysubmit(arr1, arr2);
  }

  earlysubmit(arr1, arr2) {
    if (arr1.length == arr2.length) {
      let timeout = setTimeout(() => this.changeshowside(0), 250);
    }
  }

  checkanswerinput(answer, event, correct) {
    const arr1 = answer
      .split(',')
      .map((s) => s.trim())
      .sort();
    const arr2 = correct.sort();
    this.iscorrect = JSON.stringify(arr1) === JSON.stringify(arr2);
    console.log(arr1);
    console.log(arr2);
    console.log(this.iscorrect);
    if (this.iscorrect) {
      this.changeshowside(event);
    }
  }

  changeshowside(event) {
    this.timer = 5;
    this.timerend = true;
    console.log('current side');
    console.log(this.showside);
    if (this.showside === 0) {
      console.log('flip to back');
      if (this.iscorrect === true) {
        console.log('ISCORRECT');
        this.nativeAudio.play('success');
        let timeout = setTimeout(() => this.nativeAudio.play('splash'), 300);
      } else {
        this.nativeAudio.play('fail');
        console.log('fail');
      }
      this.showside = 1;
      //this.renderer.setAttribute(event.target.parentNode.parentNode.parentNode.parentNode, 'class', 'animated flipOutY md hydrated');
    } else {
      this.showside = 0;
      console.log('flip to front');
    }
  }

  submitanswer(progressid, status, event) {
    this.random = Math.random() < 0.5;
    this.changeshowside(event);

    console.log('progressid');
    console.log(progressid);
    var statusint;
    var statusstr;
    var answerlist;
    var progressidstr;

    if (this.flipcardset.length === 0) {
      console.log('finished');
    } else {
      if (this.iscorrect === true) {
        statusint = 1;
      } else {
        statusint = 0;
      }

      statusstr = statusint.toString();
      answerlist = this.empList.toString();
      this.empList = [];
      progressidstr = progressid.toString();
      statusint = Number(status);

      console.log('POST updateprogress for ');
      console.log(this.currentcard);
      console.log('new status: ');
      console.log(statusstr);
      this.apiService
        .postupdateprogress(progressidstr, statusstr, answerlist)
        .subscribe(
          (data) => {
            console.log(data['_body']);
          },
          (error) => {
            console.log(error);
          }
        );

      this.flipcardset.shift();
      this.currentcard = this.flipcardset[0];
      this.iscorrect = false;

      if (this.currentcard) {
        this.showid = this.currentcard.flipcardID;
        this.timerstart = true;
        this.timerend = false;
        this.countdown(this.timer);
      } else {
        this.finished = true;
        console.log('the end');

        /*
     let interstitialConfig: AdMobFreeInterstitialConfig = {
         isTesting: true, // Remove in production
         autoShow: true//,
         //id: "ca-app-pub-3940256099942544/6300978111"
     };
     this.admobFree.interstitial.config(interstitialConfig);
     this.admobFree.interstitial.prepare().then(() => {
       this.finished = true;
     }).catch(e => alert(e));

*/
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
