import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyPage } from './study.page';

const routes: Routes = [
  {
    path: ':lessonId',
    component: StudyPage,
  },
  {
    path: ':lessonId/do-set',
    loadChildren: () =>
      import('./do-set/do-set.module').then((m) => m.DoSetPageModule),
  },
  {
    path: ':lessonId/view-set',
    loadChildren: () =>
      import('./view-set/view-set.module').then((m) => m.ViewSetPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyPageRoutingModule {}
