import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./multimedial-list/multimedial-list.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./multimedial-form/multimedial-form.component')
    },
    {
        path: 'competencias',
        loadComponent: ()=> import('./competencias-list/competencias-list.component')
    }
];
