import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public itemService: ItemService) {
  }

  ionViewDidLoad() {
    
    let item_id = this.navParams.get('item_id') 

    this.itemService.findById(item_id).subscribe(res => {
      this.item = res
    }, error=>{})
  }

}
