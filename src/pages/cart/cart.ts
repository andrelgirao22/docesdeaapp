import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public cartService: CartService,
    public authService: AuthService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart()
    this.itens = cart.itens
  }

  ionViewCanEnter() {

    let canEnter: boolean = this.authService.isLoggedIn()
    if(!canEnter) {
      let alert = this.alertCtrl.create({
        title: 'Autenticação é necessário',
        message: 'Faça o login antes de pedir',
        enableBackdropDismiss: false,
        buttons: [
            {text: 'Ok', handler: value => this.goToAuth() },
            {text: 'Cancelar'}
        ]
    })
    alert.present()
    }

    return canEnter
  }

  goToAuth() {
    this.navCtrl.setRoot('HomePage')
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
