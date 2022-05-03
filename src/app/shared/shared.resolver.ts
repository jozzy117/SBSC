import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class UserResolver implements Resolve<Observable<any[]>> {
    constructor(private _user:UserService) {}
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | Observable<Observable<any[]>> | Promise<Observable<any[]>> {
        const id = route.paramMap.get('id') || '';
        return this._user.getUser(parseInt(id));
    }
}