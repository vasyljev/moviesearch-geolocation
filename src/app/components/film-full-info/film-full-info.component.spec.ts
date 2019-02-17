import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFullInfoComponent } from './film-full-info.component';

describe('FilmFullInfoComponent', () => {
  let component: FilmFullInfoComponent;
  let fixture: ComponentFixture<FilmFullInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmFullInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
