import { Injectable } from '@angular/core';
import { LocalStorageService } from './../../services/local-storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements  HttpInterceptor {

    constructor(public storage: LocalStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        
        let token = this.storage.getLocalUser()
        if(token) {
            const authReq = req.clone({headers:req.headers.set('Authorization', 'Bearer ' + token.access_token)})
            return next.handle(authReq)
        } 
        return next.handle(req)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};