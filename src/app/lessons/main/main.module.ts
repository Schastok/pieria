import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { MainPage } from './main.page';
import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    PipesModule,
  ],
  declarations: [MainPage],
  providers: [Storage],
})
export class MainPageModule {}
