import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

import { Article } from '../interfaces/intefaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage,
    private toastCtrl: ToastController) {

    this.init();
    this.cargarFavoritos();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarNoticia(noticia: Article) {

    //validación para no guardar duplicados
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      //pone la noticia al inicio del arreglo
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Favorito guardado correctamente');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Favorito borrado correctamente');
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }


}
