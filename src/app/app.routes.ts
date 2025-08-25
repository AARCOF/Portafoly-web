import { Routes } from '@angular/router';
import { Confirm } from './pages/confirm/confirm';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'confirm', component: Confirm },
  { path: 'profile', component: Profile },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
