import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import {} from 'googlemaps';

@Injectable()
export class TaxDeliveryService {

    
    url = `${API_CONFIG.baseUrl}/taxDelivery`

    constructor(public http: HttpClient) {
    }

    getValueTax(distance: number) {
        return this.http.get(`${this.url}/distance?distance=${distance}`)
    }

    getDistance(cepini: string, cepfim: string) {
        return this.http.get(`${API_CONFIG.googleDistancematrix}/?origins=${cepini}&destinations=${cepfim}&mode=driving&language=en-EN&sensor=false`)
    }

    public getDistancia(origen: string, destino: string):google.maps.DistanceMatrixService {
        return new google.maps.DistanceMatrixService();
    }

}