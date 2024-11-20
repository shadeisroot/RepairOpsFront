import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMakerComponent } from './case-maker.component';

describe('CaseMakerComponent', () => {
  let component: CaseMakerComponent;
  let fixture: ComponentFixture<CaseMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
