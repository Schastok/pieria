import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursedetailsPageRoutingModule } from './coursedetails-routing.module';

// import { CoursedetailsPage } from './coursedetails.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CoursedetailsPage } from './coursedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursedetailsPageRoutingModule,
    PipesModule,
  ],
  declarations: [CoursedetailsPage],
})
export class CoursedetailsPageModule {}
