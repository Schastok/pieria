import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
// import {
//   AdMobFree,
//   AdMobFreeBannerConfig,
//   AdMobFreeInterstitialConfig,
//   AdMobFreeRewardVideoConfig,
// } from '@ionic-native/admob-free/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { VoiceRecorder } from 'capacitor-voice-recorder';
let audioPlayer: HTMLAudioElement | null = null;
@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.page.html',
  styleUrls: ['./do-quiz.page.scss'],
  standalone: false,
})
export class DoQuizPage implements OnInit {
  toggle_bool = 1;
  time: number = 0;
  interval;
  record = 0;
  f;
  duration;
  audiobinary;
  status: string = '';
  audioFile: MediaObject;
  spinner;
  showscore = true;
  available = true;
  quizId;
  html;
  data;
  quizDescription;
  quizName;
  quizType;
  solutiondata;
  solutionhtml;
  showsolution = false;
  showwaiting = false;
  answeropts;
  firstclick = false;
  next = false;
  before = false;
  counter = 0;
  selection;
  selection_id = '';
  selection_dict = {};
  selection_dict_rev = {};
  answermap = {};
  success = false;
  hasslides = false;
  slidecheck = false;
  started = 0;
  training = false;
  training_text = '';
  selectbadge = true;
  ready = false;
  error = false;
  error_text = '';

  solutionstyle_correct = `display: inline;
  border: 0 solid #AB2747;
  border-bottom: 2px dotted #008B8B;
  color: #008B8B;
  background: rgba(0, 0, 0, 0);
  width: auto;`;

  solutionstyle_wrong = `display: inline;
  border: 0 solid #AB2747;
  border-bottom: 2px dotted #AB2747;
  color: #AB2747;
  background: rgba(0, 0, 0, 0);
  width: auto;`;

  solutionstyle_correct_long = `display: inline;
  border: 0 solid #AB2747;
  border-bottom: 2px dotted #008B8B;
  color: #008B8B;
  background: rgba(0, 0, 0, 0);`;

  solutionstyle_wrong_long = `display: inline;
  border: 0 solid #AB2747;
  border-bottom: 2px dotted #AB2747;
  color: #AB2747;
  background: rgba(0, 0, 0, 0);`;

  element;
  sol = true;
  dynamicstyle = `
  <style>
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: none !important;
  }

  .p{
    font-size:smaller;
    padding-top: 30px;
  }
  .gapfillinput {
    display: inline;
    border: 0 solid #AB2747;
    border-bottom: 2px dotted #008B8B;
    color: #1e1e1e
    background: rgba(0, 0, 0, 0);
    min-width:50px!important;
    max-width:99.99%!important;
    transition: width 0.25s;
    text-align:center;
    border-radius: 10%;


  }

  .longquestion {
    display: inline;
    border: 0 solid #AB2747;
    border-bottom: 2px dotted #008B8B;
    color: #fff;
    font-size: larger;
    background: rgba(0, 0, 0, 0);
    min-width:50px!important;
    max-width:99.99%!important;
    transition: width 0.25s;
    text-align:center;
    width: 100%;
    margin-top: 5%;


  }

  .longquestionlabel{
    display: inline;
    font-size: large;
    color: #fff;
    font-style: italic;



  }


  .gapfillsolution {
    display: inline;
    border: 0 solid #AB2747;
    border-bottom: 2px dotted #008B8B;
    color: rgba(0,142,198,1);
    width: 38px;
    background: rgba(0, 0, 0, 0);
    border-radius: 10%;
  }

  .mediaimage{
    margin-top: 50px;
    text-align: center;
  }

  .question{
    margin: 10px;
    padding-top: 10px;
    border-top: 2px solid #fff;
    text-align: center;
    font-size: larger;
  }

  .question_span{
font-family: 'Montserrat-Regular';
  font-size: 20px;
  }

.aclass{
  font-size: large;
  margin-left: 0%;
  text-align: left;
    margin-left: 30%;
}

@media screen and (min-width: 700px) {
.aclass{
    margin-left: 45%;
}
}


  input[type=checkbox] + label {
    display: -webkit-inline-box;
    //display: block;
    margin: 0.2em;
    cursor: pointer;
    padding: 0.2em;
  }
  input[type=checkbox] {
    display: none;
  }

  input[type=checkbox] + label:before {
    content: "\\2714";
    border: 0.1em solid  #008B8B;
    border-radius: 1em;

    display: inline-block;
    width: 20px;
    height: 15px;
    //padding-left: 0.2em;
    padding-bottom: 0.3em;
    margin-right: 0.2em;
    vertical-align: bottom;
    color: transparent;
    transition: .2s;
  }

  input[type=checkbox] + label:active:before {
    transform: scale(0);
  }

  input[type=checkbox]:checked + label:before {
    background-color: #008B8B;
    border-color: #008B8B;
    color: #fff;
  }

  input[type=checkbox]:disabled + label:before {
    transform: scale(1);
    border-color: #aaa;
  }

  input[type=checkbox]:checked:disabled + label:before {
    transform: scale(1);
    background-color: #008B8B;
    border-color: #008B8B;
  }


td{
  padding: 5px;
  width: fit-content!important;
  vertical-align: baseline;
  font-family: 'Montserrat-Regular';
  font-size: 22px;
  border: none;
  //text-align: center;
  //font-size: 80%;
}

table{
  //border: 2px solid #4A80F0;
  border: none;
  margin-top: 20px;
  //font-size: medium;
  width: 100% !important;
  //table-layout: fixed;
}

div.p{
  margin-bottom: 10px;
}

.spanclass{
  display: block;
  font-size: 16px;
  margin-right: 5px;
}


.droparea1{

  min-width: 60px;
      min-height: 33px;
      display: inline-block;
      margin-left: 2px;
      margin-right: 5px;
      //top: 10px;
      border-bottom: 1px dotted #008B8B;
      position: relative;
      //background-image: url('/assets/images/dot.svg');

}

.droparea7{
  width: -webkit-fill-available!important;
  min-width: 60px!important;
  min-height: 20px;
  display: inline-block;
  margin-left: 2px;
  margin-right: 5px;
  border: none !important;
  padding-bottom: 20%;
  border-bottom: 0px dotted #fff;
  background-color: #F0F0F0;
}
.dragbadge{
  text-align: center;
  font-family: 'Montserrat-Regular';
background-color: #f0f0f0;


}

.droparea7 .dragbadge{
  font-size: 60%!important;
  width: -webkit-fill-available;
  text-align: center;
}

textarea{
  padding: 20px;
  margin-top: 10%;
  width: -webkit-fill-available;
  background-color: #F0F0F0;
  color: #1e1e1e;
  border: none;
  border-radius: 20px;
  height: 300px;
}

.slidewrapper{
  text-align: center;
}


.activeslide {

    -webkit-animation: slide 2s forwards;
    animation: slide 2s forwards;
    opacity: 0;
}

@-webkit-keyframes slide {
    100% { opacity: 100;}
}

@keyframes slide {
    100% { opacity: 100;}
}

.comment{
      color: #3c7a7a;
      border-radius: 20px;
      box-shadow: 0px 0.2px 10px #b3b5b4ad;
      margin-top: 10%;
      padding: 20px;
      line-height: 1.3;
      font-size: 16px!important;
}

  </style>`;

  base64Audio = '';

  constructor(
    // private admobFree: AdMobFree,
    private nativeAudio: NativeAudio,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private media: Media,
    private file: File,
    private location: Location,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.audioFile = this.media.create(
      this.file.externalRootDirectory + '/audiotemp.mp3'
    );

    this.nativeAudio.preloadSimple('fanfare', 'assets/audio/fanfare.wav');

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('quizId')) {
        //redirect
        return;
      }
      this.quizId = paramMap.get('quizId');
      console.log('Do quiz!!!!!');
    });

    this.apiService.getExercise(this.quizId).subscribe(
      (data) => {
        this.data = data;
        console.log(this.data.html);

        this.html = this.data.html;
        this.html = this.html.replace(
          new RegExp('/media/', 'g'),
          'https://www.e-fluent.com/media/',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('(<span class="spanclass">)(</span>)(.*?)(</label>)', 'g'),
          '$1$3$2$4',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('badge badge-light', 'g'),
          'droparea' + this.data.Type,
          'g'
        );
        this.html = this.html.replace(new RegExp('ondrop', 'g'), '', 'g');
        this.html = this.html.replace(new RegExp('drop.event.', 'g'), '', 'g');
        this.html = this.html.replace(
          new RegExp('ondragover="allowDrop.event.', 'g'),
          '',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('<div class="badge badge-info".+?</div>', 'g'),
          '',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('<script>.+?</script>', 'g'),
          '',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('class="gapfillinput"', 'g'),
          'class="gapfillinput" autocapitalize="off" onkeydown="console.log(this.style.width); this.style.width = ((this.value.length + 1) * 16) + \'px\';"',
          'g'
        );

        this.html = this.html.replace(
          new RegExp('<table.+?>', 'g'),
          '<div class="slidewrapper" id ="quizslides">',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('</table>', 'g'),
          '</div>',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('<tr>', 'g'),
          '<div class="slide" style="display:none;">',
          'g'
        );
        this.html = this.html.replace(
          new RegExp('<tr.+?>', 'g'),
          '<div class="slide" style="display:none;">',
          'g'
        );
        this.html = this.html.replace(new RegExp('</tr>', 'g'), '</div>', 'g');
        this.html = this.html.replace(
          new RegExp('<td.+?>', 'g'),
          '<div style="margin-top:10px;font-size:24px;color:#1e1e1e;">',
          'g'
        );
        this.html = this.html.replace(new RegExp('</td>', 'g'), '</div>', 'g');
        this.html = this.html.replace(new RegExp('&arr', 'g'), '<p></p>', 'g');
        var match = this.html.match(new RegExp('<div class="slide"', 'g'));
        if (match != null) {
          this.hasslides = true;
        }

        this.html = this.dynamicstyle + this.html;
        this.quizDescription = this.data.Description;
        this.quizName = this.data.Title;
        this.quizType = this.data.Type;

        if (this.quizType === 1) {
          this.training_text = 'Please select the word that fits the gap';
        } else if (this.quizType === 2) {
          this.training_text = 'Please enter a word that fits the gap';
        } else if (this.quizType === 99) {
          var submit = document.getElementById('submitdiv');
          this.renderer.setAttribute(submit, 'style', 'visibility:hidden;');
        }

        if ([1, 7].includes(this.data.Type)) {
          var match = this.data.html.match(
            new RegExp('<script>var dict = (.+?);</script>', 'g')
          );
          match = match[0].replace(
            new RegExp('<script>var dict = ', 'g'),
            '',
            'g'
          );
          match = match.replace(new RegExp(';</script>', 'g'), '', 'g');
          console.log(match);
          var dictionary = JSON.parse(match.replace(/'/g, '"'));
          this.answermap = dictionary;
          this.answeropts = Object.keys(dictionary).map(function (key) {
            return dictionary[key];
          });
          console.log(this.answeropts);
        }

        this.ready = true;
      },

      (err) => {
        if (err.status == 403) {
          console.log('not authorized. Please change to premium');
          this.available = false;
        }
        console.log('getData has thrown and error of', err);
      }
    );
  }

  _remove_error = (e: MouseEvent | TouchEvent): void => {
    this.error = false;
  };

  _trainingnextonclick = (e: MouseEvent | TouchEvent): void => {
    if (this.training) {
      if (this.quizType === 2) {
        var nxt = document.getElementById('slidenext');
        this.renderer.setAttribute(
          nxt,
          'style',
          "background-image: url('/assets/images/dot_right.svg');"
        );
        this.renderer.setAttribute(nxt, 'disabled', 'false');
        this.training_text = "Click on 'next' to continue the quiz";
        let inputfields = document.getElementsByClassName('gapfillinput');
        for (let i = 0; i < inputfields.length; i++) {
          var style = inputfields[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              inputfields[i],
              'style',
              'background-image: none;'
            );
          } else {
            this.renderer.setAttribute(
              inputfields[i],
              'style',
              style + 'background-image: none;'
            );
          }
        }
      } else if (this.quizType === 6) {
        var nxt = document.getElementById('slidenext');
        this.renderer.setAttribute(
          nxt,
          'style',
          "background-image: url('/assets/images/dot_right.svg');"
        );
        this.renderer.setAttribute(nxt, 'disabled', 'false');
        this.training_text = "Click on 'next' to continue the quiz";
        let checkboxes = document.getElementsByClassName('aclass');
        for (let i = 0; i < checkboxes.length; i++) {
          var style = checkboxes[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              checkboxes[i],
              'style',
              'background-image: none;'
            );
          } else {
            this.renderer.setAttribute(
              checkboxes[i],
              'style',
              style + 'background-image: none;'
            );
          }
        }
      }
    }
  };

  cleanuptraining() {
    if (this.training) {
      var nxt = document.getElementById('slidenext');
      this.renderer.setAttribute(nxt, 'style', 'background-image:none;');

      if (this.quizType === 1) {
        let childrendrop = document.getElementsByClassName('droparea1');
        for (let i = 0; i < childrendrop.length; i++) {
          var style = childrendrop[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              childrendrop[i],
              'style',
              'background-image: none;'
            );
          } else {
            this.renderer.setAttribute(
              childrendrop[i],
              'style',
              style + 'background-image: none;'
            );
          }
        }
      } else if (this.quizType === 2) {
        let gapfillinputs = document.getElementsByClassName('gapfillinput');
        for (let i = 0; i < gapfillinputs.length; i++) {
          var style = gapfillinputs[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              gapfillinputs[i],
              'style',
              'background-image: none;'
            );
          } else {
            this.renderer.setAttribute(
              gapfillinputs[i],
              'style',
              style + 'background-image: none;'
            );
          }
        }
      } else if (this.quizType === 6) {
        let checkboxes = document.getElementsByClassName('aclass');
        for (let i = 0; i < checkboxes.length; i++) {
          var style = checkboxes[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              checkboxes[i],
              'style',
              'background-image: none;'
            );
          } else {
            this.renderer.setAttribute(
              checkboxes[i],
              'style',
              style + 'background-image: none;'
            );
          }
        }
      }

      this.training = false;
      this.storage.set('training_' + this.quizType + '_done', 1);
    }
  }

  starttraining() {
    if (this.training) {
      console.log('training!');
      console.log(this.quizType);

      if (this.quizType === 1) {
        this.training_text = 'Click on the word matching the gap';
        var answeropt = document.getElementById('answeropt');
        this.renderer.setAttribute(answeropt, 'style', 'visibility:visible;');

        let dragbadges = document.getElementsByClassName('dragbadge');
        for (let i = 0; i < dragbadges.length; i++) {
          var style = dragbadges[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              dragbadges[i],
              'style',
              "background-image: url('/assets/images/dot.svg');"
            );
          } else {
            this.renderer.setAttribute(
              dragbadges[i],
              'style',
              style + "background-image: url('/assets/images/dot.svg');"
            );
          }
        }
      } else if (this.quizType === 2) {
        this.training_text = 'Enter the matching word into the gap';
        let gapfillinputs = document.getElementsByClassName('gapfillinput');
        for (let i = 0; i < gapfillinputs.length; i++) {
          gapfillinputs[i].addEventListener('keyup', this._trainingnextonclick);
          var style = gapfillinputs[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              gapfillinputs[i],
              'style',
              "background-image: url('/assets/images/dot.svg');"
            );
          } else {
            this.renderer.setAttribute(
              gapfillinputs[i],
              'style',
              style + "background-image: url('/assets/images/dot.svg');"
            );
          }
        }
      } else if (this.quizType === 6) {
        this.training_text = 'select one one more correct answers';
        let checkboxes = document.getElementsByClassName('aclass');
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].addEventListener('click', this._trainingnextonclick);
          var style = checkboxes[i].getAttribute('style');
          if (style === null) {
            this.renderer.setAttribute(
              checkboxes[i],
              'style',
              "background-image: url('/assets/images/dot_right.svg');background-repeat: no-repeat;"
            );
          } else {
            this.renderer.setAttribute(
              checkboxes[i],
              'style',
              style +
                "background-image: url('/assets/images/dot_right.svg');background-repeat: no-repeat;"
            );
          }
        }
      } else {
        this.training = false;
        this.storage.set('training_' + this.quizType + '_done', 1);
      }
    }
  }

  endtraining() {
    if (this.training) {
      var nxt = document.getElementById('slidenext');
      this.renderer.setAttribute(nxt, 'style', 'background-image:none;');

      this.cleanuptraining();
    }
    this.training = false;
    this.storage.set('training_' + this.quizType + '_done', 1);
  }

  slidebefore() {
    // all slides invisible, button start in slideshow triggers visibility of first slide. counter-> set next slide to visible with button next
    let slides = document.getElementById('quizslides').children;
    this.counter = this.counter - 1;
    this.renderer.setAttribute(slides[this.counter], 'style', 'display: none;');
    slides[this.counter].className = 'slide';
    this.renderer.setAttribute(
      slides[this.counter - 1],
      'style',
      'display: block;'
    );
    slides[this.counter - 1].className = 'activeslide';
    console.log(this.counter);
    if (this.counter < slides.length) {
      this.next = true;
    }
    if (this.counter == 1) {
      this.before = false;
    }
  }

  slidenext() {
    // all slides invisible, button start in slideshow triggers visibility of first slide. counter-> set next slide to visible with button next
    let slides = document.getElementById('quizslides').children;
    this.renderer.setAttribute(
      slides[this.counter - 1],
      'style',
      'display: none;'
    );
    slides[this.counter - 1].className = 'slide';
    this.renderer.setAttribute(
      slides[this.counter],
      'style',
      'display: block;'
    );
    slides[this.counter].className = 'activeslide';
    this.counter = this.counter + 1;
    this.before = true;
    console.log(this.counter);
    if (this.counter == slides.length) {
      this.next = false;
      this.slidecheck = true;
    }

    this.endtraining();
  }

  slidestart() {
    //this.training = true; //will depend on storage value and quiztype
    // all slides invisible, button start in slideshow triggers visibility of first slide. counter-> set next slide to visible with button next
    let slides = document.getElementById('quizslides').children;
    console.log(slides[0]);
    this.renderer.setAttribute(slides[0], 'style', 'display:block;');
    slides[0].className = 'activeslide';
    this.next = true;
    this.counter = this.counter + 1;

    this.storage.get('training_' + this.quizType + '_done').then(
      (val) => {
        console.log('training found for  ', this.quizType);
        if (val === null) {
          this.training = true;
          this.starttraining();
        } else {
          this.training = false;
          var answeropt = document.getElementById('answeropt');
          this.renderer.setAttribute(answeropt, 'style', 'visibility:visible;');
        }
      },
      (error) => console.log(error)
    );
  }

  resize() {
    console.log('key hit');
    let target = event.target as HTMLInputElement;
    target.style.width = (target.value.length + 1) * 8 + 'px';
  }

  doclick(event: any) {
    if (event.target.getAttribute('used') == 'yes') {
      return;
    } else {
      if (this.selection_id == event.target.id) {
        this.renderer.setAttribute(
          event.target,
          'style',
          'background-color: #F0F0F0;'
        );
        this.renderer.setAttribute(event.target, 'used', 'no');
        this.selection_id = '';
        this.selection = '';
        this.selectbadge = false;
      } else {
        if (this.training) {
          let childrendrag = document.getElementsByClassName('dragbadge');
          for (let i = 0; i < childrendrag.length; i++) {
            var style = childrendrag[i].getAttribute('style');
            if (style === null) {
              this.renderer.setAttribute(
                childrendrag[i],
                'style',
                'background-image: none;'
              );
            } else {
              this.renderer.setAttribute(
                childrendrag[i],
                'style',
                style + 'background-image: none;'
              );
            }
          }

          this.training_text = 'Click on the gap in the text';
          let childrendrop = document.getElementsByClassName('droparea1');
          for (let i = 0; i < childrendrop.length; i++) {
            var style = childrendrop[i].getAttribute('style');
            if (style === null) {
              this.renderer.setAttribute(
                childrendrop[i],
                'style',
                "background-image: url('/assets/images/dot.svg');"
              );
            } else {
              this.renderer.setAttribute(
                childrendrop[i],
                'style',
                style + "background-image: url('/assets/images/dot.svg');"
              );
            }
          }
        }

        this.renderer.setAttribute(
          event.target,
          'style',
          'background-color: #9CD1D1;'
        );
        this.selectbadge = true;
        this.renderer.setAttribute(event.target, 'used', 'no');
        if (this.selection_id != '') {
          console.log(this.selection_id);
          var el = document.getElementById(this.selection_id);
          this.renderer.setAttribute(el, 'style', 'background-color: #F0F0F0;');
          this.selectbadge = false;
        }
        this.selection_id = event.target.id;
        this.selection = event.target.firstChild.nodeValue.trim();
      }
    }

    if (!this.firstclick) {
      let children = document.getElementsByClassName('droparea1');

      for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('click', (event: Event) => {
          if (
            this.selection_dict[(event.target as HTMLElement).id] != '' &&
            this.selection_dict.hasOwnProperty((event.target as HTMLElement).id)
          ) {
            console.log(this.selection_dict);
            console.log(this.selection);
            var usedid = this.selection_dict[(event.target as HTMLElement).id];
            var usedel = document.getElementById(usedid);
            this.renderer.setAttribute(
              usedel,
              'style',
              'background-color: #F0F0F0;'
            );
            this.renderer.setAttribute(usedel, 'used', 'no');
            this.selectbadge = false;
          }
          this.selection_dict[(event.target as HTMLElement).id] =
            this.selection_id;

          var hiddeninput = document.getElementById(
            'q' + (event.target as HTMLElement).id
          ) as HTMLInputElement;
          hiddeninput.value = this.selection;
          (event.target as HTMLElement).textContent = this.selection;
          var droparea = document.getElementById(
            (event.target as HTMLElement).id
          );
          console.log(droparea);
          this.renderer.setAttribute(
            droparea,
            'style',
            'background-image: none;'
          );

          if (this.selection_id != '') {
            var el = document.getElementById(this.selection_id);
            this.renderer.setAttribute(
              el,
              'style',
              'text-decoration: line-through; background-color: #F0F0F0; background-image: none;'
            ); //background-color: #AB2747;
            this.renderer.setAttribute(el, 'used', 'yes');
            this.selectbadge = false;
            if (this.training) {
              this.training_text = "Click on 'next' to continue the quiz";
              var nxt = document.getElementById('slidenext');
              this.renderer.setAttribute(
                nxt,
                'style',
                "background-image: url('/assets/images/dot_right.svg');"
              );
              this.renderer.setAttribute(nxt, 'disabled', 'false');
            }
          }

          this.selection = '';
          this.selection_id = '';
        });
      }
      this.firstclick = true;
    }
  }

  doclick7(event: any) {
    let target = event.target as HTMLElement;
    let droparea = false;
    if (target.className == 'droparea7') {
      droparea = true;
    }

    if (!droparea && target.getAttribute('used') == 'yes') {
      if (this.selection_id != '') {
        console.log('THIS IS IT');
        return;
      }
      console.log('Selection used: ', this.selection_id); // click on already used badges, should be in containers
      var el = document.getElementById('answeropt');
      el.appendChild(target.parentElement as HTMLElement);
      this.renderer.setAttribute(target, 'style', 'background-color: #F0F0F0;');
      this.renderer.setAttribute(target, 'used', 'no');

      this.selection_id = target.id;
    } else {
      if (this.selection_id != '') {
        var el = document.getElementById(this.selection_id);
        this.renderer.setAttribute(el, 'style', 'background-color: #F0F0F0;');
        this.renderer.setAttribute(el, 'used', 'no');
      }

      this.renderer.setAttribute(target, 'style', 'background-color: #9CD1D1;');
      this.renderer.setAttribute(target, 'used', 'selected');
      this.selection_id = target.id;

      if (!this.firstclick) {
        let children = document.getElementsByClassName('droparea7');

        for (let i = 0; i < children.length; i++) {
          children[i].addEventListener('click', (event: Event) => {
            let target = event.target as HTMLElement;
            if (
              target.className != 'droparea7' &&
              target.getAttribute('used') == 'yes'
            ) {
              return;
            }
            if (
              this.selection_id != '' &&
              document.getElementById(this.selection_id).getAttribute('used') ==
                'selected'
            ) {
              this.selection_dict_rev[this.selection_id] = target.id;
              var containerinputid = 'q' + target.id.substring(13);
              this.selection_dict[containerinputid] = [];

              var hiddeninput = document.getElementById(
                containerinputid
              ) as HTMLInputElement;
              var result = '';
              console.log(this.selection_id);
              console.log(target);
              target.appendChild(
                document.getElementById(this.selection_id)
                  .parentElement as HTMLElement
              );
              console.log('Length Container: ', target.children.length);
              for (let y = 0; y < target.children.length; y++) {
                var child = target.children[y].children[0];
                var childid = child.id.substring(2);
                this.selection_dict[containerinputid].push(
                  this.answermap[childid]
                );
              }

              //hiddeninput.value = result;

              console.log(this.selection_dict);
              if (this.selection_id != '') {
                var el = document.getElementById(this.selection_id);
                this.renderer.setAttribute(
                  el,
                  'style',
                  'background-color: #F0F0F0;'
                );
                this.renderer.setAttribute(el, 'used', 'yes');
              }

              this.selection = '';
              this.selection_id = '';
            } else if (this.selection_id == '') {
            } else {
              var el = document.getElementById(this.selection_id);
              this.renderer.setAttribute(
                el,
                'style',
                'background-color: #F0F0F0;'
              );
              this.renderer.setAttribute(el, 'used', 'no');
              this.selection = '';
              this.selection_id = '';
              let containers = document.getElementsByClassName('droparea7');
              console.log('containers', containers.length);
              for (let i = 0; i < containers.length; i++) {
                console.log('container no:', i + 1, ' id: ', containers[i].id);
                console.log(
                  'container no:',
                  i + 1,
                  ' children: ',
                  containers[i].children.length
                );
                var containerinputid = 'q' + containers[i].id.substring(13);
                this.selection_dict[containerinputid] = [];

                for (let y = 0; y < containers[i].children.length; y++) {
                  console.log(
                    'element no:',
                    y + 1,
                    ' id: ',
                    containers[i].children[y].children[0].id
                  );
                  var child = containers[i].children[y].children[0];
                  var childid = child.id.substring(2);
                  this.selection_dict[containerinputid].push(
                    this.answermap[childid]
                  );
                }

                //hiddeninput.value = result;

                console.log(this.selection_dict);
              }
            }
          });
        }
        this.firstclick = true;
      }
    }
  }

  submit(event: any) {
    // Process checkout data here
    let target = event.target;
    let formData = {};

    if ([1, 2, 3, 4, 5, 8, 9].indexOf(this.data.Type) >= 0) {
      for (let i = 0; i < target.length; i++) {
        formData[target.elements[i].getAttribute('name')] =
          target.elements[i].value;
      }
      if (this.data.Type === 9 && formData['q1'].length < 1) {
        this.error = true;
        this.error_text = 'Please write something before submitting';
        var textarea = document.getElementById('q1');
        textarea.addEventListener('keyup', this._remove_error);
        return;
      }
    } else if (this.data.Type === 10) {
      formData['q1'] = this.audiobinary;
    } else if (this.data.Type === 6) {
      for (let i = 0; i < target.length; i++) {
        if (target.elements[i].checked) {
          formData[target.elements[i].getAttribute('name')] = 'on';
        } else {
          formData[target.elements[i].getAttribute('name')] = 'off';
        }
      }
    } else if (this.data.Type === 7) {
      let keys = Object.keys(this.selection_dict);
      let containers = document.getElementsByClassName('droparea7');
      if (keys.length < containers.length) {
        for (let i = 0; i < containers.length; i++) {
          if (keys.includes('q' + containers[i].id.substring(13))) {
          } else {
            this.selection_dict['q' + containers[i].id.substring(13)] = [];
          }
        }
      }
      keys = Object.keys(this.selection_dict);
      for (let i = 0; i < keys.length; i++) {
        console.log(this.selection_dict[keys[i]]);
        if (this.selection_dict[keys[i]].length > 0) {
          formData[keys[i]] = this.selection_dict[keys[i]].join(';');
        } else {
          console.log('empty');
          formData[keys[i]] = '';
          console.log(formData[keys[i]]);
        }
      }
    } else {
      console.log('unknown type');
    }

    this.spinner = true;
    console.log('formData', formData);
    this.apiService.postquiz(formData, this.quizId).subscribe(
      (data: any) => {
        this.solutiondata = data;
        console.log('SOLUTIONDATA: ', this.solutiondata);

        if (this.solutiondata.total > 0) {
          this.success =
            this.solutiondata.score / this.solutiondata.total >= 0.8;
        }
        if (this.quizType === 9) {
          this.success = false;
          this.showscore = false;
        }
        if (this.quizType === 10) {
          this.success = false;
          this.showscore = false;
        }
        if (this.success) {
          this.nativeAudio.play('fanfare');
        }
        this.solutionhtml = this.dynamicstyle + data.ex;
        this.solutionhtml = this.solutionhtml.replace(
          new RegExp('/media/', 'g'),
          'https://www.e-fluent.com/media/',
          'g'
        );
        if (this.quizType != 8) {
          this.showsolution = true;
        } else {
          this.showwaiting = true;
        }
        setTimeout(() => {
          this.checkanswer(0);
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.spinner = false;
      }
    );
  }

  toggle() {
    this.checkanswer(this.toggle_bool);
    if (this.toggle_bool == 0) {
      this.toggle_bool = 1;
    } else {
      this.toggle_bool = 0;
    }
  }

  checkanswer(mode) {
    console.log('Ex Data');
    console.log(this.solutiondata);
    let qid = '';
    var element;

    if (mode === 0) {
      // correct answers from Db

      for (var i = 0; i < this.solutiondata.ids.length; i++) {
        if (this.data.Type === 3 || this.data.Type === 7) {
          qid = this.solutiondata.ids[i].toString();
          element = document.getElementById('q' + qid);
        } else {
          qid = this.solutiondata.ids[i];
          element = document.getElementById(qid);
        }

        if (this.data.Type === 7) {
          element.innerHTML = '';
          let container_correct = this.solutiondata.canswers[qid].split(';');
          let container_yours = this.solutiondata.yanswers[qid].split(';');
          for (let y = 0; y < container_correct.length; y++) {
            console.log('Correct: ', container_correct);
            console.log('yours: ', container_yours);
            if (container_yours.includes(container_correct[y])) {
              element.innerHTML +=
                '<div class="dragbadge" style="display: flex; font-family:Montserrat; background: #f0f0f0; border-radius: 15px; margin-top: 2px; margin-bottom: 4px; padding:10px; font-size: 60%!important;width: -webkit-fill-available;text-align: center;">' +
                container_correct[y] +
                '</div>';
            } else {
              element.innerHTML +=
                '<div class="dragbadge" style="display: flex; font-family:Montserrat; background:  #f0f0f0; border-radius: 15px; margin-top: 2px; margin-bottom: 4px; padding:10px; font-size: 60%!important;width: -webkit-fill-available;text-align: center;">' +
                container_correct[y] +
                '</div>';
            }
          }
        } else {
          if (
            this.solutiondata.canswers[qid] === this.solutiondata.yanswers[qid]
          ) {
            if ([1, 2, 4, 5].indexOf(this.data.Type) >= 0) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_correct
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.canswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 9) {
              element.innerHTML = this.solutiondata.canswers[qid];
            } else if (this.data.Type === 10) {
              element.innerHTML = this.solutiondata.canswers[qid];
            } else if (this.data.Type === 3) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_correct_long
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.canswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 6) {
              console.log(this.solutiondata.canswers);
              let label = document.getElementById('l' + qid);
              this.renderer.setAttribute(label, 'style', 'color: #008B8B;');
              if (this.solutiondata.canswers[qid] === 'on') {
                this.renderer.setAttribute(element, 'checked', 'true');
                console.log('check !!!!');
              } else if (this.solutiondata.canswers[qid] === 'off') {
                this.renderer.removeAttribute(element, 'checked');
                console.log('uncheck !!!!');
                console.log(element);
              } else {
                console.log('was ist das !!!!');
              }
              this.renderer.setAttribute(element, 'disabled', 'true');
              console.log('Multiple Choice !!!!');
            } else {
              console.log('unknown ex type');
            }
            //this.renderer.setStyle(element,'width', String((this.solutiondata.canswers[qid].length * 8)+6)+'px');
          } // end if correct
          else {
            if ([1, 2, 4, 5].indexOf(this.data.Type) >= 0) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_wrong
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.canswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 9) {
              element.innerHTML = this.solutiondata.canswers[qid];
            } else if (this.data.Type === 10) {
              element.innerHTML = this.solutiondata.canswers[qid];
            } else if (this.data.Type === 3) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_wrong_long
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.canswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 6) {
              console.log(this.solutiondata.canswers);
              let label = document.getElementById('l' + qid);
              this.renderer.setAttribute(label, 'style', 'color: #AB2747;');
              if (this.solutiondata.canswers[qid] === 'on') {
                this.renderer.setAttribute(element, 'checked', 'true');
                console.log('check !!!!');
              } else if (this.solutiondata.canswers[qid] === 'off') {
                this.renderer.removeAttribute(element, 'checked');
                console.log('uncheck !!!!');
                console.log(element);
              } else {
                console.log('was ist das !!!!');
              }
              console.log('Multiple Choice !!!!');
              this.renderer.setAttribute(element, 'disabled', 'true');
            } else {
              console.log('unknown ex type');
            }
          } // end else correct
        }

        //Do something
      } // endfor

      this.sol = false;
    } // end mode 0
    else {
      for (var i = 0; i < this.solutiondata.ids.length; i++) {
        if (this.data.Type === 3 || this.data.Type === 7) {
          qid = this.solutiondata.ids[i].toString();
          element = document.getElementById('q' + qid);
        } else {
          qid = this.solutiondata.ids[i];
          element = document.getElementById(qid);
        }
        console.log(qid);
        console.log('get element');
        console.log(element);

        if (this.data.Type === 7) {
          element.innerHTML = '';
          let container_correct = this.solutiondata.canswers[qid].split(';');
          let container_yours = this.solutiondata.yanswers[qid].split(';');
          for (let y = 0; y < container_yours.length; y++) {
            console.log('Correct: ', container_correct);
            console.log('yours: ', container_yours);
            if (container_correct.includes(container_yours[y])) {
              element.innerHTML +=
                '<div class="dragbadge" style="display: flex; font-family:Montserrat; background: #f0f0f0;  border-radius: 15px; margin-top: 2px; margin-bottom: 4px; padding:10px; width: fit-content; font-size: 16px;font-size: 60%!important;width: -webkit-fill-available;text-align: center;">' +
                container_yours[y] +
                '</div>';
            } else if (
              !container_correct.includes(container_yours[y]) &&
              container_yours[y] != ''
            ) {
              element.innerHTML +=
                '<div class="dragbadge" style="display: flex; background:  #f0f0f0; border-radius: 15px; margin-top: 2px; margin-bottom: 4px; padding:10px; width: fit-content; font-size: 16px;font-size: 60%!important;width: -webkit-fill-available;text-align: center;">' +
                container_yours[y] +
                '</div>';
            } else {
              element.innerHTML +=
                '<div class="dragbadge" style="visibility: hidden; display: flex; background:  #f0f0f0; border-radius: 15px; margin-top: 2px; margin-bottom: 4px; padding:10px; width: fit-content; font-size: 16px;font-size: 60%!important;width: -webkit-fill-available;text-align: center;">' +
                container_correct[y] +
                '</div>';
            }
          }
        } else {
          if (
            this.solutiondata.canswers[qid] === this.solutiondata.yanswers[qid]
          ) {
            if ([1, 2, 4, 5].indexOf(this.data.Type) >= 0) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_correct
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.yanswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 9) {
              element.innerHTML = this.solutiondata.yanswers[qid];
            } else if (this.data.Type === 10) {
              element.innerHTML = this.solutiondata.yanswers[qid];
            } else if (this.data.Type === 3) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_correct_long
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.yanswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 6) {
              console.log(this.solutiondata.canswers);
              let label = document.getElementById('l' + qid);
              this.renderer.setAttribute(label, 'style', 'color: #008B8B;');
              if (this.solutiondata.yanswers[qid] === 'on') {
                this.renderer.setAttribute(element, 'checked', 'true');
                console.log('check !!!!');
              } else if (this.solutiondata.yanswers[qid] === 'off') {
                this.renderer.removeAttribute(element, 'checked');
                console.log('uncheck !!!!');
                console.log(element);
              } else {
                console.log('was ist das !!!!');
              }
              console.log('Multiple Choice !!!!');
            } else {
              console.log('unknown ex type');
            }
          } else {
            if ([1, 2, 4, 5].indexOf(this.data.Type) >= 0) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_wrong
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.yanswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 9) {
              element.innerHTML = this.solutiondata.yanswers[qid];
            } else if (this.data.Type === 10) {
              element.innerHTML = this.solutiondata.yanswers[qid];
            } else if (this.data.Type === 3) {
              this.renderer.setAttribute(
                element,
                'style',
                this.solutionstyle_wrong_long
              );
              this.renderer.setAttribute(
                element,
                'value',
                this.solutiondata.yanswers[qid]
              );
              this.renderer.setAttribute(element, 'readonly', 'true');
              this.renderer.setAttribute(
                element,
                'size',
                this.solutiondata.canswers[qid].length
              );
            } else if (this.data.Type === 6) {
              let label = document.getElementById('l' + qid);
              this.renderer.setAttribute(label, 'style', 'color: #AB2747;');
              console.log(this.solutiondata.canswers);
              if (this.solutiondata.yanswers[qid] === 'on') {
                this.renderer.setAttribute(element, 'checked', 'true');
                console.log('check !!!!');
              } else if (this.solutiondata.yanswers[qid] === 'off') {
                this.renderer.removeAttribute(element, 'checked');
                console.log('uncheck !!!!');
                console.log(element);
              } else {
                console.log('was ist das !!!!');
              }
              console.log('Multiple Choice !!!!');
            } else {
              console.log('unknown ex type');
            }
            //Do something
          }
        }
      }
      this.sol = true;
    }

    let htmldivelement = document.getElementById('solhtml');
    console.log(htmldivelement);
    this.renderer.removeAttribute(htmldivelement, 'hidden');
  }

  async startrecording() {
    const hasperm = await VoiceRecorder.hasAudioRecordingPermission();
    if (!hasperm.value) {
      const perm = await VoiceRecorder.requestAudioRecordingPermission();
      if (perm.value) {
        await VoiceRecorder.startRecording();
        this.time = 0;
        this.duration = 0;
        this.startTimer();
        this.record = 1;
      } else {
        console.log('permission not allowed');
      }
    } else {
      await VoiceRecorder.startRecording();
      this.time = 0;
      this.duration = 0;
      this.startTimer();
      this.record = 1;
    }
  }

  async stoprecording() {
    const result = await VoiceRecorder.stopRecording();
    this.base64Audio = result.value.recordDataBase64;
    this.duration = this.time;
    this.stopTimer();
    this.record = 2;
  }

  play() {
    this.stopTimer();
    // this.audioFile.play();
    const audio = new Audio('data:audio/aac;base64,' + this.base64Audio);
    audio.play();
    this.record = 3;
    this.countdown();
  }

  stop() {
    this.stopTimer();
    const audio = new Audio('data:audio/aac;base64,' + this.base64Audio);
    audio.pause();
    this.record = 4;
    this.stopTimer();
    this.time = 0;
  }

  deleterecording() {
    this.base64Audio = '';
    this.record = 0;
    this.time = 0;
    this.duration = 0;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time < 30) {
        this.time++;
        console.log(this.time);
      } else {
        this.stoprecording();
        console.log('stop timer');
        clearInterval(this.interval);
      }
    }, 1000);
  }

  countdown() {
    clearInterval(this.interval);

    this.time = 0;
    console.log(this.duration);
    console.log(this.time);
    this.interval = setInterval(() => {
      if (this.time < this.duration) {
        this.time++;
      } else {
        this.stop();
        this.time = 0;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    console.log('stop timer manually');
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = reject;
      //fr.readAsArrayBuffer(file);
      fr.readAsDataURL(file);
    });
  }

  goBack() {
    this.location.back();
  }
}
