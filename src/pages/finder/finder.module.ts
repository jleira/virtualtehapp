import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinderPage } from './finder';

@NgModule({
  declarations: [
    FinderPage,
  ],
  imports: [
    IonicPageModule.forChild(FinderPage),
  ],
})
export class FinderPageModule {}
