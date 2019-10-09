import { CartService } from './../../services/domain/cart.service';
import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    username :"", 
    password: ""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthService, 
    public cartService: CartService) {

      let email = this.navParams.get('newEmail')
      if(email) {
        this.credenciais.username = email
      }

  }

  login() {
    this.authService.authenticate(this.credenciais).subscribe(res => {
      this.authService.successfullLogin(JSON.parse(res.body))
      let cart = this.cartService.getCart()
      if(cart && cart.itens.length > 0) {
        this.navCtrl.setRoot('PickAddressPage')
      } else {
        this.navCtrl.setRoot('CategoriasPage')
      }
    }, error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(res => {
      if(this.authService.successfullLogin(JSON.parse(res.body))) {
        this.navCtrl.setRoot('CategoriasPage')
      }
    }, error => {})
  }

}
