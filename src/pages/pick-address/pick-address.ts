import { CartService } from './../../services/domain/cart.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { AccountService } from './../../services/domain/account.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO, AccountDTO } from '../../models/acount.dto';
import { OrderDTO } from '../../models/order.dto';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  addres: AddressDTO
  address: AddressDTO[]
  order: OrderDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: LocalStorageService,
    public accountService: AccountService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email) {
      this.accountService.findlByEmail(localUser.email).subscribe(res => {
        this.populeOrder(res)
      }, error => {})
    }
    
  }

  populeOrder(res: AccountDTO) {
    debugger
    let account  = res
        this.address = account.addresses
        
        this.order = {
          id: null,
          account: account,
          payments: [],
          orderItens: this.cartService.getCart().itens,
          orderValue: this.cartService.total()
        }
  }

  selectAddress(address: AddressDTO) {
    debugger
    this.addres = address
  }

  nextPage() {
    this.order.account.addresses = []
    this.order.account.addresses.push(this.addres)
    this.navCtrl.push('PaymentPage', {order: this.order})
  }

}
