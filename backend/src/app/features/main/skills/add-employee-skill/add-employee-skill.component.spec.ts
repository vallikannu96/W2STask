import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeSkillComponent } from './add-employee-skill.component';

describe('AddEmployeeSkillComponent', () => {
  let component: AddEmployeeSkillComponent;
  let fixture: ComponentFixture<AddEmployeeSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
