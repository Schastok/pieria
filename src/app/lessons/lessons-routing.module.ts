import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage,
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainPageModule),
  },
  // {
  //   path: 'learn',
  //   loadChildren: () => import('./learn/learn.module').then( m => m.LearnPageModule)
  // },
  {
    path: 'learn',
    children: [
      {
        path: ':lessonId',
        loadChildren: () =>
          import('./learn/learn.module').then((m) => m.LearnPageModule),
      },
      {
        path: ':lessonId/section/:sectionId',
        loadChildren: () =>
          import('./learn/section/section.module').then(
            (m) => m.SectionPageModule
          ),
      },
    ],
  },
  {
    path: 'study',
    loadChildren: () =>
      import('./study/study.module').then((m) => m.StudyPageModule),
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quiz/quiz.module').then((m) => m.QuizPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
