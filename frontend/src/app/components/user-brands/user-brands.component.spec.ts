import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBrandsComponent } from './user-brands.component';

describe('UserBrandsComponent', () => {
  let component: UserBrandsComponent;
  let fixture: ComponentFixture<UserBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
