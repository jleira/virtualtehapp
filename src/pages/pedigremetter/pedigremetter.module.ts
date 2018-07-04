import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedigremetterPage } from './pedigremetter';

@NgModule({
  declarations: [
    PedigremetterPage,
  ],
  imports: [
    IonicPageModule.forChild(PedigremetterPage),
  ],
})
export class PedigremetterPageModule {}
