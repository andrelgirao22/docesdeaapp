import { AuthService } from './../../services/auth.service';
import { TaxDelivery } from './../../models/tax-delivery.dto';
import { TaxDeliveryService } from './../../services/tax-delivery.service';
import { CartService } from './../../services/domain/cart.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { AccountService } from './../../services/domain/account.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  taxDelivery: TaxDelivery = {
    value: 0.0
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: LocalStorageService,
    public accountService: AccountService,
    public cartService: CartService,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public taxDeliveryService: TaxDeliveryService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email) {
      this.accountService.findlByEmail(localUser.email).subscribe(res => {
        this.populeOrder(res)
      }, error => {})
    }
    
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

  populeOrder(res: AccountDTO) {
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
    this.addres = address
    this.calculateTax()
  }

  calculateTax() {
    let cepini = "60450235"
    let cepfim = this.addres.postalCode
    let distance = 10
    this.taxDeliveryService.getValueTax(distance).subscribe(res=> {
      if(res && res[0]) {
        this.taxDelivery = res[0]
      }
    })
    /*this.taxDeliveryService.getDistancia(cepini, cepfim)
      .getDistanceMatrix({'origins': [cepini], 'destinations': [cepfim], travelMode: google.maps.TravelMode.DRIVING,  }, results => {
        if(results.rows && results.rows.length > 0) {
          distance = results.rows[0].elements[0].distance.value
          distance = distance/1000
        }
        this.taxDeliveryService.getValueTax(distance).subscribe(res=> {
          if(res && res[0]) {
            this.taxDelivery = res[0]
          }
        })
    })*/
  }

  nextPage() {

    let item = {
      id: "99999",
      name: "FRETE",
      price: this.taxDelivery.value   
    }

    this.order.account.addresses = []
    this.order.account.addresses.push(this.addres)
    this.order.orderItens.push({item: item, quantity: 1})
    this.cartService.addItem(item)
    this.navCtrl.push('PaymentPage', {order: this.order})
  }

}
