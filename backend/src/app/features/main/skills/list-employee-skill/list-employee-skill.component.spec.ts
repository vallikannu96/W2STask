import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeeSkillComponent } from './list-employee-skill.component';

describe('ListEmployeeSkillComponent', () => {
  let component: ListEmployeeSkillComponent;
  let fixture: ComponentFixture<ListEmployeeSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmployeeSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeeSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
