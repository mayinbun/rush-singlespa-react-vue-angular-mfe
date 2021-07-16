import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-aragorn',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
