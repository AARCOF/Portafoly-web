import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearch } from './profile-search';

describe('ProfileSearch', () => {
  let component: ProfileSearch;
  let fixture: ComponentFixture<ProfileSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
