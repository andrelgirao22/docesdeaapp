import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public itemService: ItemService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {

    let loader=  this.presentLoading()

    this.categoriaService.findAll().subscribe(res => {
      this.categorias = res

      let lastItem = this.categorias.length

      res.forEach((cat, index) => {
        this.categoriaService.findImage(cat.id, "0").subscribe(res => {

          const blob = new Blob([res.body], { type: 'application/octet-stream' })
          let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))
          cat.imageUrl = image
          
          if(index == lastItem - 1) {
            loader.dismiss()
          }

        }, error => {})
      })
    })
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: 'Carregando aguarde...',
    });

    loader.present()
    return loader
  }

  showItems(categoria_id: string) {
    this.navCtrl.push('ItemPage', {categoria_id: categoria_id})
  }

}
