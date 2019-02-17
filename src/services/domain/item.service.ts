import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemService {

    constructor(public http: HttpClient) {}

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage:number = 24):any {
        return this.http.get(`${API_CONFIG.baseUrl}/item/category/${categoria_id}?page=${page}&linesPerPage=${linesPerPage}`)
    }

    findById(item_id: string): any {
        return this.http.get(`${API_CONFIG.baseUrl}/item/${item_id}`)
    }

}