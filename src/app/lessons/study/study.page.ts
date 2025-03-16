import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
  standalone: false,
})
export class StudyPage implements OnInit {
  lessonId: string;
  flipcardlist;
  progress;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('lessonId')) {
        //redirect
        return;
      }
      this.lessonId = paramMap.get('lessonId');
      console.log('call API');
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
        var el = document.getElementById('bar');
        var r = parseInt(el.getAttribute('r'));
        var c = Math.PI * (r * 2);

        if (val < 0) {
          val = 0;
        }
        if (val > 100) {
          val = 100;
        }

        var pct = ((100 - val) / 100) * c;

        this.renderer.setAttribute(el, 'style', 'stroke-dashoffset:' + pct);

        document
          .getElementById('cont')
          .setAttribute('data-pct', val.toString());
        this.progress = val;
      });
    });
  }
}
