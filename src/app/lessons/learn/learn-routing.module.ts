import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnPage } from './learn.page';

const routes: Routes = [
  {
    path: ':lessonId',
    component: LearnPage,
  },
  {
    path: ':lessonId/section/:sectionId',
    loadChildren: () =>
      import('./section/section.module').then((m) => m.SectionPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnPageRoutingModule {}
