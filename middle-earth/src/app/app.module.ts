import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomElementInjectorComponent } from './custom-element-injector-component';
import { MiddleEarthComponent } from './middle-earth/middle-earth.component';

@NgModule({
  declarations: [
    AppComponent,
    MiddleEarthComponent,
    CustomElementInjectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
