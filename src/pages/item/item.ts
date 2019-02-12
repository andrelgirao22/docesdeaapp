import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  items: ItemDTO[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemService: ItemService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id')
    this.itemService.findByCategoria(categoria_id).subscribe(res => {
      this.items = res.content
    }, error =>{})
  }

  showDetail(item_id: string) {
    this.navCtrl.push('ItemDetailPage', {item_id: item_id})
  }

}
