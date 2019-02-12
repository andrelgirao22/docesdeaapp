import { CartService } from './../../services/domain/cart.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';


@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  item: ItemDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemService: ItemService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    
    let item_id = this.navParams.get('item_id') 

    this.itemService.findById(item_id).subscribe(res => {
      this.item = res
    }, error=>{})
  }

  addToCart(item: ItemDTO) {
    this.cartService.addItem(item)
    this.navCtrl.setRoot('CartPage')
  }

}
