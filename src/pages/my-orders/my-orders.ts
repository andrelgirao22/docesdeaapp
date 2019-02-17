import { AccountService } from './../../services/domain/account.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { OrderService } from '../../services/domain/order.service';


@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {

  orders: OrderDTO[] = []
  page: number = 0

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrderService,
    public accountService: AccountService,
    public storage: LocalStorageService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    let account_email = this.storage.getLocalUser().email
    let loader = this.presentLoading()
    this.orderService.findOrdersByAccount(account_email, this.page, 10).subscribe(res => {
      console.log(res)
      this.orders = this.orders.concat(res.content)
      loader.dismiss()
    }, error => { 
      this.goToHome()
      loader.dismiss()
    })
  }

  
  doRefresh(event) {
    this.page = 0
    this.orders = []
    this.loadData() 
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage')
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: 'Aguarde...',
    });
    
    loader.present()
    return loader
  }

  doInfinite(event) {
    this.page++
    this.loadData()
    setTimeout(() => {

      event.complete();
    }, 1000);
  }

}
