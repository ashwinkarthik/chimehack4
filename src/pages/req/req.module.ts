import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReqPage } from './req';

@NgModule({
  declarations: [
    ReqPage,
  ],
  imports: [
    IonicPageModule.forChild(ReqPage),
  ],
  exports: [
    ReqPage
  ]
})
export class ReqPageModule {}
