import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./events/event.routes').then(m => m.EVENT_ROUTES)
    }
];
