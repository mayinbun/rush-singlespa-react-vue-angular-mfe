import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiddleEarthComponent } from './middle-earth/middle-earth.component';

const routes: Routes = [
  {
    path: '',
    component: MiddleEarthComponent,
    pathMatch: 'full'
  },
  {
    path: 'aragorn',
    loadChildren: () => import('aragorn/AragornModule').then(m => m.AragornModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
