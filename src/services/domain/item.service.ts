import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ItemService {

    constructor(public http: HttpClient) {}

    url = `${API_CONFIG.baseUrl}/item`

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage:number = 24):any {
        return this.http.get(`${this.url}/category/${categoria_id}?page=${page}&linesPerPage=${linesPerPage}`)
    }

    findById(item_id: string): any {
        return this.http.get(`${this.url}/${item_id}`)
    }

    findImage(id: string, index: string): Observable<any> {
        let uri = `${this.url}/picture/${id}/index/${index}`
        return this.http.get(uri, {observe: 'response', responseType: 'blob'})
    }

}