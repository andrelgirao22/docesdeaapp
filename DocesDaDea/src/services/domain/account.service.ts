import { LocalStorageService } from './../local-storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AccountDTO } from "../../models/acount.dto";

@Injectable()
export class AccountService  {

    constructor(public http: HttpClient, public storage: LocalStorageService) {}

    findlByEmail(email: string): Observable<AccountDTO> {
        return this.http.get<AccountDTO>(`${API_CONFIG.baseUrl}/account/${email}`)
    }

    insert(obj: AccountDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/account`, 
            obj, {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}