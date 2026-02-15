import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryData } from './country-data';

describe('CountryData', () => {
  let component: CountryData;
  let fixture: ComponentFixture<CountryData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
