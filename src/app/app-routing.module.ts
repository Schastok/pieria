import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'lessons',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./lessons/lessons.module').then((m) => m.LessonsPageModule),
      },

      {
        path: ':lessonId/:lessonImage/:lessonName/:lessonDescription/overview',
        loadChildren: () =>
          import('./lessons/main/main.module').then((m) => m.MainPageModule),
      },

      {
        path: 'learn',
        children: [
          {
            path: ':lessonId',
            loadChildren: () =>
              import('./lessons/learn/learn.module').then(
                (m) => m.LearnPageModule
              ),
          },
          {
            path: ':lessonId/section/:sectionId',
            loadChildren: () =>
              import('./lessons/learn/section/section.module').then(
                (m) => m.SectionPageModule
              ),
          },
        ],
      },
      {
        path: 'study',
        children: [
          {
            path: ':lessonId',
            //redirectTo: ':lessonId/do_set',
            loadChildren: () =>
              import('./lessons/study/study.module').then(
                (m) => m.StudyPageModule
              ),
          },
          {
            path: ':lessonId/do_set',
            loadChildren: () =>
              import('./lessons/study/do-set/do-set.module').then(
                (m) => m.DoSetPageModule
              ),
          },
          {
            path: ':lessonId/view_set',
            loadChildren: () =>
              import('./lessons/study/view-set/view-set.module').then(
                (m) => m.ViewSetPageModule
              ),
          },
        ],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'quiz',
        children: [
          {
            path: ':lessonId/:evalID',
            loadChildren: () =>
              import('./lessons/quiz/quiz.module').then(
                (m) => m.QuizPageModule
              ),
          },
          {
            path: ':lessonId/do_quiz/:quizId',
            loadChildren: () =>
              import('./lessons/quiz/do-quiz/do-quiz.module').then(
                (m) => m.DoQuizPageModule
              ),
          },
        ],
      },
    ],
  },

  {
    path: 'authenticate',
    loadChildren: () =>
      import('./authenticate/authenticate.module').then(
        (m) => m.AuthenticatePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./logout/logout.module').then((m) => m.LogoutPageModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountPageModule),
  },
  {
    path: 'mycourses',
    loadChildren: () =>
      import('./mycourses/mycourses.module').then((m) => m.MycoursesPageModule),
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesPageModule),
      },
      {
        path: 'coursedetails/:ClassroomId/:ClassroomImage/:ClassroomName/:ClassroomDescription/:new',
        loadChildren: () =>
          import('./courses/coursedetails/coursedetails.module').then(
            (m) => m.CoursedetailsPageModule
          ),
      },
    ],
  },
  {
    path: 'delete-account',
    loadChildren: () =>
      import('./delete-account/delete-account.module').then(
        (m) => m.DeleteAccountPageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountPageModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'cancelsubscription',
    loadChildren: () =>
      import('./cancelsubscription/cancelsubscription.module').then(
        (m) => m.CancelsubscriptionPageModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacy/privacy.module').then((m) => m.PrivacyPageModule),
  },
];

const config: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
