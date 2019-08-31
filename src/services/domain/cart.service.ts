import { ItemDTO } from './../../models/item.dto';
import { Cart } from './../../models/cart';
import { LocalStorageService } from './../local-storage.service';
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {

    constructor(public storage: LocalStorageService) {}

    createOrClearCart(): Cart {
        let cart: Cart = {itens: []}
        this.storage.setCart(cart)
        return cart
    }

    getCart(): Cart {
        let cart = this.storage.getCart()
        if(cart == null) {
            cart = this.createOrClearCart();
        }

        return cart
    }

    addItem(item:ItemDTO): Cart {
        let cart = this.getCart()
        let position = cart.itens.findIndex(i => i.item && i.item.id == item.id)
        if(position == -1) {
            cart.itens.push({item: item, quantity: 1})
        } 
        this.storage.setCart(cart)
        return cart
    }

    removeItem(item:ItemDTO): Cart {
        let cart = this.getCart()
        let position = cart.itens.findIndex(i => i.item.id == item.id)
        if(position != -1) {
            cart.itens.splice(position, 1)
        } 
        this.storage.setCart(cart)
        return cart
    }

    increaseQuantity(item: ItemDTO) {
        let cart = this.getCart()
        let position = cart.itens.findIndex(i => i.item.id == item.id)
        if(position != -1) {
            cart.itens[position].quantity ++
        } 
        this.storage.setCart(cart)
        return cart
    }

    decreaseQuantity(item: ItemDTO) {
        let cart = this.getCart()
        let position = cart.itens.findIndex(i => i.item.id == item.id)
        if(position != -1) {
            cart.itens[position].quantity --
            if(cart.itens[position].quantity < 1) {
                cart = this.removeItem(item)
            }
        } 
        this.storage.setCart(cart)
        return cart
    }

    total(): number {
        let cart = this.storage.getCart()
        let sum = 0
        for(var i=0; i< cart.itens.length; i++) {
            sum += cart.itens[i].item.price * cart.itens[i].quantity
        }
        return sum
    }

}