import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public itemService: ItemService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData() 
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id')
    let loader=  this.presentLoading()
    this.itemService.findByCategoria(categoria_id).subscribe(res => {
      this.items = res.content
      loader.dismiss()
    }, error =>{
      loader.dismiss()
    })
  }

  showDetail(item_id: string) {
    this.navCtrl.push('ItemDetailPage', {item_id: item_id})
  }

  doRefresh(event) {
    this.loadData() 
    setTimeout(() => {
      event.complete();
    }, 1000);
  }


  presentLoading() {
    
    let loader = this.loadingController.create({
      content: 'Aguarde...',
    });
    
    loader.present()

    return loader
  }

}
