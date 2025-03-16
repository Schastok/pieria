import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false,
})
export class MainPage implements OnInit {
  lessonId: string;
  lessonImage;
  lessonDescription;
  lessonName;
  first_section;
  sections;
  exercises;
  flipcardlist;
  flipdone = false;
  flipprogress = 0;
  sections_done = {};
  overallprogress = 0;
  first_section_description;
  ready1 = false;
  ready2 = false;
  ready3 = false;
  ready4 = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storage: Storage,
    private router: Router,
    private location: Location
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('lessonId')) {
        //redirect
        return;
      }
      if (!paramMap.has('lessonImage')) {
        //redirect
        return;
      }
      if (!paramMap.has('lessonDescription')) {
        //redirect
        return;
      }
      if (!paramMap.has('lessonName')) {
        //redirect
        return;
      }
      this.lessonId = paramMap.get('lessonId');
      this.lessonImage = paramMap.get('lessonImage');
      this.lessonDescription = paramMap.get('lessonDescription');
      this.lessonName = paramMap.get('lessonName');
      console.log(this.lessonId);

      console.log('TOKEN ', this.apiService.TOKEN);
      this.apiService.getSections(this.lessonId).subscribe((data) => {
        console.log(data);
        this.sections = data;

        let sect_arr = Object.keys(data);
        console.log(sect_arr);
        for (let i = 0; i < sect_arr.length; i++) {
          console.log('get sections');

          if (this.sections[i].Config.length > 0) {
            var obj = JSON.parse(this.sections[i].Config);
            if (obj['position'] === '1') {
              this.first_section = this.sections[i];
              this.first_section_description = obj['description'];
              console.log('first');
              console.log(this.first_section_description);
              this.ready1 = true;
            }
          }

          this.sections_done[this.sections[i].Section_ID] = 0;
          this.storage
            .get(
              this.apiService.STUDENT_ID +
                '_section_' +
                this.sections[i].Section_ID +
                '_done'
            )
            .then(
              (val) => {
                console.log('section found');
                console.log(val);
                if (val === 1) {
                  this.sections_done[this.sections[i].Section_ID] = 1;
                }
                console.log('sections done');
                console.log(this.sections_done);
              },
              (error) => console.log(error)
            );
        }

        this.ready2 = true;
      });
      this.apiService.getExerciselist(this.lessonId).subscribe((data) => {
        console.log(data);
        this.exercises = data;
        console.log(this.exercises);
        this.ready4 = true;
      });
      this.apiService.getFlipcardlist(this.lessonId).subscribe((data) => {
        console.log('data pulled: ');
        console.log(data);
        this.flipcardlist = data;
        console.log(this.flipcardlist);
        var all = Object.values(data);
        var filtered = all.filter((item) => {
          if (item.multiplechoice_possible === 1 || item.entry_possible === 1) {
            return true;
          }
          return false;
        });
        var finished = all.filter((item) => {
          if (item.Status >= 5) {
            return true;
          }
          return false;
        });
        if (all.length > 0) {
          var val = Math.floor((finished.length / filtered.length) * 100);
        } else {
          var val = 0;
        }
        if (val == 100) {
          this.flipdone = true;
        }
        this.flipprogress = val;
        console.log(this.flipdone);
        this.ready3 = true;
      });
    });

    setTimeout(() => {
      this.logprogress();
    }, 1000);
  }

  logprogress() {
    //update the general Lessonprogress
    let has_s = 0;
    if (Object.keys(this.sections).length > 0) {
      has_s = 1;
    }
    let has_f = 0;
    if (Object.keys(this.flipcardlist).length > 0) {
      has_f = 1;
    }
    let has_q = 0;
    if (Object.keys(this.exercises).length > 0) {
      has_q = 1;
    }

    let divisor = 100 / (has_s + has_f + has_q);

    let s_prog = 0;

    let s_arr = Object.keys(this.sections_done);

    for (let i = 0; i < s_arr.length; i++) {
      if (this.sections_done[s_arr[i]] == 1) {
        s_prog += (1 / s_arr.length) * divisor;
      }
    }

    let f_prog = (divisor * this.flipprogress) / 100;

    let q_prog = 0;
    let q_arr = Object.keys(this.exercises);
    for (let i = 0; i < q_arr.length; i++) {
      if (this.exercises[i].Evaluation >= 80) {
        q_prog += (1 / q_arr.length) * divisor;
      }
    }

    this.overallprogress = (q_prog + f_prog + s_prog) * 0.01;
    this.storage.set(
      this.apiService.STUDENT_ID + '_prog_' + this.lessonId,
      this.overallprogress
    );
  }

  getColor(index: any) {
    var colordict = { 0: '#F77B6E', 1: '#FCCE38', 2: '#4F71EC', 3: '#10D398' };
    return colordict[index];
  }
  getColor2(index: any) {
    var colordict = { 3: '#F77B6E', 2: '#FCCE38', 1: '#4F71EC', 0: '#10D398' };
    return colordict[index];
  }

  goBack() {
    this.location.back();
  }
}
