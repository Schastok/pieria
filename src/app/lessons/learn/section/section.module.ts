import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionPageRoutingModule } from './section-routing.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { SectionPage } from './section.page';
import Swiper from 'swiper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionPageRoutingModule,
    PipesModule,
  ],
  declarations: [SectionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Swiper],
})
export class SectionPageModule {}
