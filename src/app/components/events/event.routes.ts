import { Routes } from '@angular/router';
import { ListEventComponent } from './list-event/list-event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const EVENT_ROUTES: Routes = [
  { path: 'list', component: ListEventComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'edit/:id', component: UpdateEventComponent },
];

export default EVENT_ROUTES;
