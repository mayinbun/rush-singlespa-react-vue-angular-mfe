import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AssetUrlPipe } from '../../single-spa/asset-url';
import { AragornComponent } from './aragorn.component';
import { StriderComponent } from './strider/strider.component';

const routes: Route[] = [
  {
    path: '',
    component: AragornComponent
  },
  {
    path: 'strider',
    component: StriderComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    AragornComponent,
    StriderComponent,
    AssetUrlPipe,
  ],
})
export class AragornModule {

}
