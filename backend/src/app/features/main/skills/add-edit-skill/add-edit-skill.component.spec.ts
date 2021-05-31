import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSkillComponent } from './add-edit-skill.component';

describe('AddEditSkillComponent', () => {
  let component: AddEditSkillComponent;
  let fixture: ComponentFixture<AddEditSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
