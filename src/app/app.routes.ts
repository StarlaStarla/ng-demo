import { Routes } from '@angular/router';
import { detailGuard } from './detail/detail.guard';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SecurityComponent } from './about/security/security.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: 'security',
        component: SecurityComponent, // another child route component that the router renders
      },
    ],
    outlet: 'aux'
  },
  {
    path: 'detail/:id',
    canActivate: [detailGuard],
    // canMatch: [detailMatch], // 添加 canMatch 守卫
    // data: { requiredRole: 'admin' }, // 权限要求：管理员
    loadComponent: () => import('./detail/detail.component').then(c => c.DetailComponent)
    // component: DetailComponent
  },
  {
    path: '**', // 匹配所有未定义的路径
    redirectTo: '', // 将未匹配的路径重定向到首页
  }
];
