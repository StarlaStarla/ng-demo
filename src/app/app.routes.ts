import { Routes } from '@angular/router';
import { detailGuard } from './detail/detail.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  // { path: '', component: AppComponent },
  {
    path: 'detail/:id',
    canActivate: [detailGuard],
    // canMatch: [detailMatch], // 添加 canMatch 守卫
    // data: { requiredRole: 'admin' }, // 权限要求：管理员
    loadComponent: () => import('./detail/detail.component').then(c => c.DetailComponent)
    // component: DetailComponent
  },
  // {
  //   path: '**', // 匹配所有未定义的路径
  //   redirectTo: '', // 将未匹配的路径重定向到首页
  // }
];
