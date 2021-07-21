import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-aragorn',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  :host {
    display: block;
  }
  `]
})
export class AppComponent {}
