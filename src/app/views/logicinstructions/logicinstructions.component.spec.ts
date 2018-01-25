import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicinstructionsComponent } from './logicinstructions.component';

describe('LogicinstructionsComponent', () => {
  let component: LogicinstructionsComponent;
  let fixture: ComponentFixture<LogicinstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicinstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
