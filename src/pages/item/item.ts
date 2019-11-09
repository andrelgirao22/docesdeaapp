import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  items: ItemDTO[] = []
  page: number = 0
  image: any = 'assets/imgs/prod.jpg'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemService: ItemService,
    public loadingController: LoadingController,
    private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.loadData() 
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id')
    let loader=  this.presentLoading()
    this.itemService.findByCategoria(categoria_id, this.page, 10).subscribe(res => {
      this.items = this.items.concat(res.content)
      
      if(this.items.length == 0) loader.dismiss()

      this.items.forEach(item => {
        this.itemService.findImage(item.id, "0").subscribe(image => {
          const blob = new Blob([image.body], { type: 'application/octet-stream' })
          let _image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))
          item.imageUrl = _image
          this.image = _image
          loader.dismiss()
        }, error => {
          loader.dismiss()
        })
      })
    }, error =>{
      loader.dismiss()
    })
  }

  showDetail(item_id: string) {
    this.navCtrl.push('ItemDetailPage', {item_id: item_id})
  }

  doRefresh(event) {
    this.page = 0
    this.items = []
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


  doInfinite(event) {
    this.page++
    this.loadData()
    setTimeout(() => {

      event.complete();
    }, 1000);
  }
}


