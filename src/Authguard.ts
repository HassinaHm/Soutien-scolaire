// // auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { LoginService } from './app/services/login.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: LoginService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // Check if user is authenticated
//     if (this.authService.getIsAuthenticated()) { 
//       const roles = route.data['roles'] as Array<string>;
//       if (roles && roles.length > 0) {
//         const userRole = this.authService.getUserRole(); // Implement this method in AuthService
//         if (userRole && roles.includes(userRole)) {
//           return true;
//         } else {
//           // Redirect to unauthorized page or handle unauthorized access
//           return this.router.createUrlTree(['/unauthorized']);
//         }
//       }
//       return true;
//     } else {
//       // Redirect to login page if not authenticated
//       return this.router.createUrlTree(['/login']);
//     }
//   }
// }
