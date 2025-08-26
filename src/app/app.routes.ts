import { RouterModule, Routes } from '@angular/router';
import { Confirm } from './pages/confirm/confirm';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { ProfileSearch } from './pages/profile-search/profile-search';
import { Home } from './pages/home/home';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: 'register', component: Register },
      { path: 'confirm', component: Confirm },
      { path: 'login', component: Login },
      { path: 'home', component: Home },
      { path: 'search', component: ProfileSearch },
      { path: 'profile', component: Profile },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // dashboard por defecto
    ],
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // app inicia en login
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled', // 👈 activa scroll por fragment
      scrollOffset: [0, 80], // 👈 deja espacio para el header si tienes navbar fija
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
