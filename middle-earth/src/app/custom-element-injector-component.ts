import { loadRemoteModule } from '@angular-architects/module-federation';
import { DOCUMENT } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'custom-element-injector',
  template: '<section #vc></section>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomElementInjectorComponent implements AfterContentInit {
  @ViewChild('vc', { read: ElementRef, static: true }) viewContainer!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngAfterContentInit() {
    const elementName = this.activatedRoute.snapshot.data['elementName'];
    const remoteEntry = this.activatedRoute.snapshot.data['remoteEntry'];
    const remoteName = this.activatedRoute.snapshot.data['remoteName'];
    const exposedModule = this.activatedRoute.snapshot.data['exposedModule'];

    loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule,
    })
      .then(() => {
        const element = this.document.createElement(elementName);
        this.viewContainer.nativeElement.appendChild(element);
      })
      .catch(console.error);
  }
}
