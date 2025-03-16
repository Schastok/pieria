import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-learn',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: false,
})
export class QuizPage implements OnInit {
  evalID: string;
  exercise;
  title;
  description;
  eval;
  html;
  result;
  dynamicstyle = `
  <style>
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: none !important;
  }

  *{
    color: white
  }
  textarea{
    display: none;
  }
  </style>
  `;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('evalID')) {
        //redirect
        return;
      }
      this.evalID = paramMap.get('evalID');
    });

    this.apiService.getExerciseEval(this.evalID).subscribe((data) => {
      console.log(data);
      this.exercise = data;
      this.title = this.exercise.Title;
      this.description = this.exercise.Description;
      this.eval = this.exercise.Eval;
      this.html = this.dynamicstyle + this.exercise.html;
      this.result = this.dynamicstyle + this.exercise.result;
    });
  }
}
