import { Routes } from "@angular/router";
import { ListEventComponent } from "./list-event/list-event.component";
import { CreateEventComponent } from "./create-event/create-event.component";
import { UpdateEventComponent } from "./update-event/update-event.component";
export const EVENT_ROUTES: Routes = [
    { path: '', component: ListEventComponent },
    { path: 'create', component: CreateEventComponent }
];
