import { StateDTO } from './../../models/state.dto';
import { API_CONFIG } from './../../config/api.config';
import { CityDTO } from './../../models/city.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class CityService {

    constructor(public http: HttpClient) {}

    findCities(state: StateDTO):Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/city/${state.uf}`)
    }
    
}