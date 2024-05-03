import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./menu/menu.component')
    },
    {
        path: 'multimediales',
        loadComponent: ()=> import('./multimedial/multimedial-list/multimedial-list.component')
    },
    {
        path: 'multimedial/new',
        loadComponent: () => import('./multimedial/multimedial-form/multimedial-form.component')
    },
    {
        path: 'multimedial/edit',
        loadComponent: ()=> import('./multimedial/multimedial-edit/multimedial-edit.component')
    },
    {
        path: 'competencias',
        loadComponent: ()=> import('./competencias/competencias-list/competencias-list.component')
    },
    {
        path: 'competencias/new',
        loadComponent: ()=> import('./competencias/competencias-form/competencias-form.component')
    },
    {
        path: 'competencias/edit',
        loadComponent: ()=> import('./competencias/competencias-edit/competencias-edit.component')
    }
];
