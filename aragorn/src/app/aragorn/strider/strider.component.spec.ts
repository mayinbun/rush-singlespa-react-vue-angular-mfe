import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StriderComponent } from './strider.component';

describe('StriderComponent', () => {
  let component: StriderComponent;
  let fixture: ComponentFixture<StriderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StriderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StriderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
