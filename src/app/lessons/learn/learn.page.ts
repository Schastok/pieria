import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: false,
})
export class LearnPage implements OnInit {
  lessonId: string;
  sections;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('lessonId')) {
        //redirect
        return;
      }
      this.lessonId = paramMap.get('lessonId');
      console.log('learn lesson');
    });

    this.apiService.getSections(this.lessonId).subscribe((data) => {
      console.log(data);
      this.sections = data;
      console.log('sections');
      console.log(this.sections);
    });
  }
}
