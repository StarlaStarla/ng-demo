import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  PreloadingStrategy,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const detailGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService) as AuthService;
  return auth.isLoggedIn() && auth.getRole() === 'admin';
};

export const detailMatch: CanMatchFn = (route, state) => {
  const auth = inject(AuthService) as AuthService;
  const requiredRole = route.data?.['requiredRole'];
  // 示例逻辑：允许路径中含有 "admin" 的路由匹配
  if (
    route.path?.includes('admin') &&
    !(auth.isLoggedIn() && auth.getRole() == requiredRole)
  ) {
    console.log('Access Denied!');
    return false;
  }

  return true; // 允许导航至该路由
};

export const detailResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  try {
    return await [];
  } catch {
    return new RedirectCommand(router.parseUrl('/404'));
  }
};


