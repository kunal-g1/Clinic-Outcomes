import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicOutcomesPage } from './clinic-outcomes-page';

describe('ClinicOutcomesPage', () => {
  let component: ClinicOutcomesPage;
  let fixture: ComponentFixture<ClinicOutcomesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicOutcomesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicOutcomesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
