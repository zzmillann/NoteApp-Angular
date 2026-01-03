import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Notes } from './pages/notes/notes';
export const routes: Routes = [


    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'notes',
        loadComponent: () => import('./pages/notes/notes').then(m => m.Notes)
    }
];
