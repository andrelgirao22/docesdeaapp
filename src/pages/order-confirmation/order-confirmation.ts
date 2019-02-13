import { AccountService } from './../../services/domain/account.service';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart.item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { AccountDTO, AddressDTO } from '../../models/acount.dto';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO
  cartItens: CartItem[]
  account: AccountDTO
  address: AddressDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public accountService: AccountService) {

      this.order = this.navParams.get('order')
  }

  ionViewDidLoad() {
    this.cartItens = this.cartService.getCart().itens

    this.accountService.findById(this.order.account.id).subscribe(res => {
      this.account = res
      this.address = this.findAddress(this.order.account.addresses[0].id, res['addresses'])
    }, error => {
      this.navCtrl.setRoot('HomePage')
    })
  }
  
  private findAddress(id: string, list: AddressDTO[]): AddressDTO {
    let position = list.findIndex(a => a.id == id)
    return list[position]
  }

  total() {
    return this.cartService.total()
  }

}
