import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventComponent } from './update-event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateEventComponent', () => {
  let component: UpdateEventComponent;
  let fixture: ComponentFixture<UpdateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventComponent,HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
