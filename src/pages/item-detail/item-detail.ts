import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';
import { DomSanitizer } from '@angular/platform-browser';

const defaultPathImage: string = "assets/images/prod.jpg"

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  item: ItemDTO
  images: any [] = [defaultPathImage, defaultPathImage, defaultPathImage]

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemService: ItemService,
    public cartService: CartService,
    private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    
    let item_id = this.navParams.get('item_id') 

    this.itemService.findById(item_id).subscribe(res => {
      this.item = res
      this.loadImages()
    }, error=>{})
  }

  loadImages() {
    
    for(let i = 0 ; i < 3; i++) {
      let id: string = this.item.id
      
      this.itemService.findImage(id, `${i}`).subscribe(res => {

        const blob = new Blob([res.body], { type: 'application/octet-stream' })
        let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))

        this.images[i] = image
        
      }, error => {
        console.log(error)
      })

    }
  }

  filterItemsImage(){
    return this.images.filter(image => image !== defaultPathImage)
  }

  addToCart(item: ItemDTO) {
    this.cartService.addItem(item)
    this.navCtrl.setRoot('CartPage')
  }

}
