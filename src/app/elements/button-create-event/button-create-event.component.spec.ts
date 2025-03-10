import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCreateEventComponent } from './button-create-event.component';

describe('ButtonCreateEventComponent', () => {
  let component: ButtonCreateEventComponent;
  let fixture: ComponentFixture<ButtonCreateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCreateEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
