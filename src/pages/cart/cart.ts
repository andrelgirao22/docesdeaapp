import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Item } from 'ionic-angular';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../../services/domain/cart.service';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  itens: CartItem[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public itemService: ItemService,
    private sanitizer: DomSanitizer) {

      this.removeItem({id: '99999', name:'FRETE', price: 0.0 })

  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart()
    this.itens = cart.itens

    this.itens.forEach(item => this.findImagem(item.item))
  }

  findImagem(item:ItemDTO ) {
    this.itemService.findImage(`${item.id}`, `${0}`).subscribe(res => {
        
      const blob = new Blob([res.body], { type: 'application/octet-stream' })
      let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))

      item.imageUrl = image
      
    }, error => {
      console.log(error)
    })
  }

  removeItem(item: ItemDTO) {
    this.itens = this.cartService.removeItem(item).itens
    this.itens.forEach(item => this.findImagem(item.item))
  }

  increaseItem(item: ItemDTO) {
    this.itens = this.cartService.increaseQuantity(item).itens
    this.itens.forEach(item => this.findImagem(item.item))
  }

  decreaseItem(item: ItemDTO) {
    this.itens = this.cartService.decreaseQuantity(item).itens
    this.itens.forEach(item => this.findImagem(item.item))
  }

  total() :number {
    return this.cartService.total()
  }

  goOn() {
    this.navCtrl.setRoot("CategoriasPage")
  }

  checkout() {
    this.navCtrl.push('PickAddressPage')
  }

}
