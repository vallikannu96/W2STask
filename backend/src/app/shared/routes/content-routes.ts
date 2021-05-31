import { Routes } from '@angular/router';

export const content: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('../../features/main/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () => import('../../features/main/users/users.module').then(m => m.UsersModule),
    data: {
      breadcrumb: "Users"
    }
  },
  {
    path: 'skills',
    loadChildren: () => import('../../features/main/skills/skills.module').then(m => m.SkillsModule),
    data: {
      breadcrumb: "Skills"
    }
  },
];