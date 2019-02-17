import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../../models/order.dto';

@Injectable()
export class OrderService {

    constructor(public http: HttpClient) {}

    insert(obj: OrderDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/order`,
             obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    findOrdersByAccount(email: string, page:number = 0, linesPerPage: number = 0): any {
        return this.http.get(`${API_CONFIG.baseUrl}/order/account/${email}?page=${page}&linesPerPage=${linesPerPage}`)
    }
}