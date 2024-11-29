import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSingelComponent } from './case-singel.component';

describe('CaseSingelComponent', () => {
  let component: CaseSingelComponent;
  let fixture: ComponentFixture<CaseSingelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseSingelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseSingelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
