import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../../services/domain/cart.service';
import { ItemDTO } from '../../models/item.dto';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  itens: CartItem[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart()
    this.itens = cart.itens
  }

  removeItem(item: ItemDTO) {
    this.itens = this.cartService.removeItem(item).itens
  }

  increaseItem(item: ItemDTO) {
    this.itens = this.cartService.increaseQuantity(item).itens
  }

  decreaseItem(item: ItemDTO) {
    this.itens = this.cartService.decreaseQuantity(item).itens
  }

  total() :number {
    return this.cartService.total()
  }

  goOn() {
    this.navCtrl.setRoot("CategoriasPage")
  }

  checkout() {
    this.navCtrl.push('PickAddressPage')
  }

}
