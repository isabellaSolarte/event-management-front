import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventComponent } from './list-event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListEventComponent', () => {
  let component: ListEventComponent;
  let fixture: ComponentFixture<ListEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEventComponent,HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
