import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatCustomComponent } from './creat-custom.component';

describe('CreatCustomComponent', () => {
  let component: CreatCustomComponent;
  let fixture: ComponentFixture<CreatCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
