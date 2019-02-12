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
    let account  = res
        this.address = account.addresses
        
        this.order = {
          id: null,
          account: account,
          payments: null,
          orderItens: this.cartService.getCart().itens,
        }
  }

  nextPage(address: AddressDTO) {
    this.order.account.addresses = []
    this.order.account.addresses.push(address)
    console.log('order',this.order)
    //this.navCtrl.push('')
  }

}
