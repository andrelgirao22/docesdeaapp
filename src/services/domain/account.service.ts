import { LocalStorageService } from './../local-storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AccountDTO } from "../../models/acount.dto";
import { ImageUtilService } from '../image-util.service';

@Injectable()
export class AccountService  {

    constructor(
        public http: HttpClient, 
        public storage: LocalStorageService,
        public imageService: ImageUtilService) {}

    findlByEmail(email: string): Observable<AccountDTO> {
        return this.http.get<AccountDTO>(`${API_CONFIG.baseUrl}/account/email/${email}`)
    }

    findById(id: string) {
        return this.http.get<AccountDTO>(`${API_CONFIG.baseUrl}/account/${id}`)
    }

    insert(obj: AccountDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/account`, 
            obj, {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picture, id: string) {
        let pictureBlob = this.imageService.dataUriToBlob(picture)
        let formData: FormData = new FormData()
        formData.append('file', pictureBlob, 'file.png')

        return this.http.post(`${API_CONFIG.baseUrl}/account/picture/${id}`, 
            formData, {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    getImageFromBucket(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/acc${id}.jpg`, {responseType: 'blob'})
    }

}