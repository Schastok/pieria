import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycoursesPageRoutingModule } from './mycourses-routing.module';

import { MycoursesPage } from './mycourses.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MycoursesPageRoutingModule],
  declarations: [MycoursesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MycoursesPageModule {}
