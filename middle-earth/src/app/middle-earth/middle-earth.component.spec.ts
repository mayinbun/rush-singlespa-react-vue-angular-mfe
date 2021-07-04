import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleEarthComponent } from './middle-earth.component';

describe('MiddleEarthComponent', () => {
  let component: MiddleEarthComponent;
  let fixture: ComponentFixture<MiddleEarthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiddleEarthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleEarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
