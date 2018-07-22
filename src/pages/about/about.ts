import { Component } from '@angular/core';
import { NewPedigreePage } from './new-pedigree';
import { ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SERVE_FILE_URI } from '../../config';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  mispedigree = [];
  constructor(private authservice: AuthProvider, private modalCtrl: ModalController) {
    this.traerpedigree(0);

  }

  newpedigree() {
    //    this.navCtrl.push(NewPedigreePage);
    let profileModal = this.modalCtrl.create(NewPedigreePage, { caso: 1 });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if (data) {
        this.traerpedigree(0);
      }
    });

  }
  traerpedigree(caso) {
    return this.authservice.mispedigree(caso).subscribe((data) => {
      return this.mispedigree = data.json();
    }, err => {
      return err;
    })
  }

  verpedigree(valores) {
    let profileModal = this.modalCtrl.create(NewPedigreePage, { caso: 1, mascota: valores });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if (data) {
        this.traerpedigree(0);
      }
    });
  }
  buscarimagenp(img, idmascota, userid) {
    let nimag = `${SERVE_FILE_URI}storage/app/${userid}/${idmascota}/${img.split(',')[0]}`;
    return nimag;
  }
  refrescar($event) {
    this.traerpedigree(0).add(() => {
      $event.complete();
    })
  }
}
