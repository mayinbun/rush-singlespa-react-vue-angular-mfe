import { DOCUMENT } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'custom-element-injector',
  template: `
    <section #vc></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomElementInjectorComponent implements AfterContentInit {
  @ViewChild('vc', { read: ElementRef, static: true }) viewContainer!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterContentInit() {
    const elementName = this.activatedRoute.snapshot.data['elementName'];
    const importFn: () => Promise<void> = this.activatedRoute.snapshot.data['importFn'];

    importFn()
      .then(() => {
        const element = this.document.createElement(elementName);
        this.viewContainer.nativeElement.appendChild(element);
      })
      .catch(console.error);
  }
}
