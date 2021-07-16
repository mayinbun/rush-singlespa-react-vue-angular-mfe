import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  {
    path: 'aragorn',
    loadChildren: () => import('./aragorn/aragorn.module').then(m => m.AragornModule)
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_BASE_HREF, useValue: '/'
    }
  ]
})
export class AppRoutingModule {
}
