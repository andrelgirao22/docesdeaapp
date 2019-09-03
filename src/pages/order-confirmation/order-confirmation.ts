import { AccountService } from './../../services/domain/account.service';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart.item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { AccountDTO, AddressDTO } from '../../models/acount.dto';
import { OrderService } from '../../services/domain/order.service';


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
  orderId: string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public accountService: AccountService,
    public orderService: OrderService) {

      this.order = this.navParams.get('order')

  }

  ionViewDidLoad() {
    this.cartItens = this.cartService.getCart().itens

    this.accountService.findById(this.order.account.id).subscribe(res => {
      this.account = res
      console.log('order', this.order)
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

  back() {
    this.navCtrl.setRoot('CartPage')
  }

  checkout() {
    debugger
    this.order.orderValue = this.cartService.total()
    console.log(this.order)
    this.orderService.insert(this.order).subscribe( res => {
      this.orderId = this.extractId(res.headers.get('location'))
      this.cartService.createOrClearCart()
    }, error => {
      if(error.status == 403) {
        this.navCtrl.setRoot('HomePage')
      }
    })
  }

  private extractId(location: string) {
    let position = location.lastIndexOf('/')
    return location.substring(position + 1, location.length)
  }

  goToOrders() {
    this.navCtrl.setRoot('MyOrdersPage')
  }

}
