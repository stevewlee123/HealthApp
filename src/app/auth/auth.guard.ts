import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router'
import Auth from '@aws-amplify/auth'
import { from, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            const user = await Auth.currentAuthenticatedUser()
            console.log(user)
            if (user) {
                return true
            } else {
                return false
            }
        } catch (e) {
          console.error(e)
          this.router.navigate(['/login'])
            return false
        }
    }
}
