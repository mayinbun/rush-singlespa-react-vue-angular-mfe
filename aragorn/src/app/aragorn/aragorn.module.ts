import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AragornComponent } from './aragorn.component';

const routes: Route[] = [
  {
    path: '',
    component: AragornComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    AragornComponent
  ]
})
export class AragornModule {

}
