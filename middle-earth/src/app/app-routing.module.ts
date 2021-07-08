import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomElementInjectorComponent } from './custom-element-injector-component';
import { MiddleEarthComponent } from './middle-earth/middle-earth.component';

const routes: Routes = [
  {
    path: '',
    component: MiddleEarthComponent,
    pathMatch: 'full'
  },
  { // Angular Remote
    path: 'aragorn',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:5000/remoteEntry.js',
      remoteName: 'aragorn',
      exposedModule: './AragornModule'
    }).then(m => m.AragornModule)
  },
  { // React Remote
    path: 'gandalf',
    component: CustomElementInjectorComponent,
    data: {
      elementName: 'gandalf-app',
      remoteEntry: 'http://localhost:5001/remoteEntry.js',
      remoteName: 'gandalf',
      exposedModule: './app'
    },
  },
  { // React Remote
    path: 'saruman',
    component: CustomElementInjectorComponent,
    data: {
      elementName: 'saruman-app',
      remoteEntry: 'http://localhost:5002/remoteEntry.js',
      remoteName: 'saruman',
      exposedModule: './app'
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
