import { LocalStorageService } from './../../services/local-storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements  HttpInterceptor {

    constructor(public storage: LocalStorageService, public alertCtrl: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        
        return next.handle(req)
            
            .catch((error, caught) => {
                debugger
                let errorObj = error;
                if(errorObj.error) {
                    try {
                        errorObj = JSON.parse(errorObj.error)
                    } catch(e) {
                        errorObj = JSON.parse(JSON.stringify(errorObj.error))
                    }
                    console.log(errorObj)
                }
                console.log('erro detectado pelo interceptor: ')
                console.log('status ' + errorObj.status)
                switch(errorObj.status) {
                    case 401: 
                    this.handle401()
                    break
                    case 403: 
                    this.handle403()
                    break
                    default:
                    this.handleDefault(errorObj)
                }

                return Observable.throw(errorObj)
            }) as any
    }

    handle403() {
        this.storage.setLocalUser(null)
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        })
        alert.present()
    }

    handleDefault(errorObj) {   
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ':' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        })
        alert.present()
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};