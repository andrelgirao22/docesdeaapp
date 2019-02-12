import { LocalStorageService } from './local-storage.service';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { TokenDTO } from './../models/token.dto';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storageService: LocalStorageService) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, 
            creds, 
            {
                observe: "response",
                responseType: "text"
            })
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh`, 
            {}, 
            {
                observe: "response",
                responseType: "text"
            })
    }

    successfullLogin(obj: TokenDTO): boolean {
        if(obj.access_token) {
            obj.email = this.jwtHelper.decodeToken(obj.access_token).sub
            this.storageService.setLocalUser(obj)
            return true
        }

        return false
    } 

    logout() {
        this.storageService.setLocalUser(null)
    }

}