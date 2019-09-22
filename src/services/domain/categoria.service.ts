import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {}

    url = `${API_CONFIG.baseUrl}/category`

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(this.url)
    }

    findImage(id: string, index: string): Observable<any> {
        let uri = `${this.url}/picture/${id}/index/${index}`
        return this.http.get(uri, {observe: 'response', responseType: 'blob'})
    }

}