import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../services/domain/item.service';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  categorias: CategoriaDTO[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    private sanitizer: DomSanitizer,
    public itemService: ItemService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(res => {
      this.categorias = res
      res.forEach(cat => {
        this.categoriaService.findImage(cat.id, "0").subscribe(i => {
          const blob = new Blob([i.body], { type: 'application/octet-stream' })
          let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))
          cat.imageUrl = image
        }, error => {})
      })
    })
  }

  showItems(categoria_id: string) {
    this.navCtrl.push('ItemPage', {categoria_id: categoria_id})
  }

}
