import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBidComponent } from './submit-bid.component';

describe('SubmitBidComponent', () => {
  let component: SubmitBidComponent;
  let fixture: ComponentFixture<SubmitBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitBidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
