import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController, NavParams, ViewController, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SERVE_FILE_URI } from '../../config';
import { SuccesionPage } from './succesion';

//import {ColorpickerPage} from './colorpicker';

@Component({
  selector: 'page-colorpicker',
  template: `
  <ion-grid class="popover-page">
  <ion-row>
    <ion-col style="background:#330000" (tap)="setColor('#330000')"><div ></div></ion-col>
    <ion-col style="background:#331900" (tap)="setColor('#331900')">&nbsp;</ion-col>
    <ion-col style="background:#333300" (tap)="setColor('#333300')">&nbsp;</ion-col>
    <ion-col style="background:#193300" (tap)="setColor('#193300')">&nbsp;</ion-col>
    <ion-col style="background:#003300" (tap)="setColor('#003300')">&nbsp;</ion-col>
    <ion-col style="background:#003319" (tap)="setColor('#003319')">&nbsp;</ion-col>
    <ion-col style="background:#003333" (tap)="setColor('#003333')">&nbsp;</ion-col>
    <ion-col style="background:#001933" (tap)="setColor('#001933')">&nbsp;</ion-col>
    <ion-col style="background:#000033" (tap)="setColor('#000033')">&nbsp;</ion-col>
    <ion-col style="background:#190033" (tap)="setColor('#190033')">&nbsp;</ion-col>
    <ion-col style="background:#330033" (tap)="setColor('#330033')">&nbsp;</ion-col>
    <ion-col style="background:#330019" (tap)="setColor('#330019')">&nbsp;</ion-col>
    <ion-col style="background:#000000" (tap)="setColor('#000000')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#660000" (tap)="setColor('#660000')">&nbsp;</ion-col>
    <ion-col style="background:#663300" (tap)="setColor('#663300')">&nbsp;</ion-col>
    <ion-col style="background:#666600" (tap)="setColor('#666600')">&nbsp;</ion-col>
    <ion-col style="background:#336600" (tap)="setColor('#336600')">&nbsp;</ion-col>
    <ion-col style="background:#006600" (tap)="setColor('#006600')">&nbsp;</ion-col>
    <ion-col style="background:#006633" (tap)="setColor('#006633')">&nbsp;</ion-col>
    <ion-col style="background:#006666" (tap)="setColor('#006666')">&nbsp;</ion-col>
    <ion-col style="background:#003366" (tap)="setColor('#003366')">&nbsp;</ion-col>
    <ion-col style="background:#000066" (tap)="setColor('#000066')">&nbsp;</ion-col>
    <ion-col style="background:#330066" (tap)="setColor('#330066')">&nbsp;</ion-col>
    <ion-col style="background:#660066" (tap)="setColor('#660066')">&nbsp;</ion-col>
    <ion-col style="background:#660033" (tap)="setColor('#660033')">&nbsp;</ion-col>
    <ion-col style="background:#202020" (tap)="setColor('#202020')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#990000" (tap)="setColor('#990000')">&nbsp;</ion-col>
    <ion-col style="background:#994C00" (tap)="setColor('#994C00')">&nbsp;</ion-col>
    <ion-col style="background:#999900" (tap)="setColor('#999900')">&nbsp;</ion-col>
    <ion-col style="background:#4C9900" (tap)="setColor('#4C9900')">&nbsp;</ion-col>
    <ion-col style="background:#009900" (tap)="setColor('#009900')">&nbsp;</ion-col>
    <ion-col style="background:#00994C" (tap)="setColor('#00994C')">&nbsp;</ion-col>
    <ion-col style="background:#009999" (tap)="setColor('#009999')">&nbsp;</ion-col>
    <ion-col style="background:#004C99" (tap)="setColor('#004C99')">&nbsp;</ion-col>
    <ion-col style="background:#000099" (tap)="setColor('#000099')">&nbsp;</ion-col>
    <ion-col style="background:#4C0099" (tap)="setColor('#4C0099')">&nbsp;</ion-col>
    <ion-col style="background:#990099" (tap)="setColor('#990099')">&nbsp;</ion-col>
    <ion-col style="background:#99004C" (tap)="setColor('#99004C')">&nbsp;</ion-col>
    <ion-col style="background:#404040" (tap)="setColor('#404040')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#CC0000" (tap)="setColor('#CC0000')">&nbsp;</ion-col>
    <ion-col style="background:#CC6600" (tap)="setColor('#CC6600')">&nbsp;</ion-col>
    <ion-col style="background:#CCCC00" (tap)="setColor('#CCCC00')">&nbsp;</ion-col>
    <ion-col style="background:#66CC00" (tap)="setColor('#66CC00')">&nbsp;</ion-col>
    <ion-col style="background:#00CC00" (tap)="setColor('#00CC00')">&nbsp;</ion-col>
    <ion-col style="background:#00CC66" (tap)="setColor('#00CC66')">&nbsp;</ion-col>
    <ion-col style="background:#00CCCC" (tap)="setColor('#00CCCC')">&nbsp;</ion-col>
    <ion-col style="background:#0066CC" (tap)="setColor('#0066CC')">&nbsp;</ion-col>
    <ion-col style="background:#0000CC" (tap)="setColor('#0000CC')">&nbsp;</ion-col>
    <ion-col style="background:#6600CC" (tap)="setColor('#6600CC')">&nbsp;</ion-col>
    <ion-col style="background:#CC00CC" (tap)="setColor('#CC00CC')">&nbsp;</ion-col>
    <ion-col style="background:#CC0066" (tap)="setColor('#CC0066')">&nbsp;</ion-col>
    <ion-col style="background:#606060" (tap)="setColor('#606060')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#FF0000" (tap)="setColor('#FF0000')">&nbsp;</ion-col>
    <ion-col style="background:#FF8000" (tap)="setColor('#FF8000')">&nbsp;</ion-col>
    <ion-col style="background:#FFFF00" (tap)="setColor('#FFFF00')">&nbsp;</ion-col>
    <ion-col style="background:#80FF00" (tap)="setColor('#80FF00')">&nbsp;</ion-col>
    <ion-col style="background:#00FF00" (tap)="setColor('#00FF00')">&nbsp;</ion-col>
    <ion-col style="background:#00FF80" (tap)="setColor('#00FF80')">&nbsp;</ion-col>
    <ion-col style="background:#00FFFF" (tap)="setColor('#00FFFF')">&nbsp;</ion-col>
    <ion-col style="background:#0080FF" (tap)="setColor('#0080FF')">&nbsp;</ion-col>
    <ion-col style="background:#0000FF" (tap)="setColor('#0000FF')">&nbsp;</ion-col>
    <ion-col style="background:#7F00FF" (tap)="setColor('#7F00FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF00FF" (tap)="setColor('#FF00FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF007F" (tap)="setColor('#FF007F')">&nbsp;</ion-col>
    <ion-col style="background:#808080" (tap)="setColor('#808080')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#FF3333" (tap)="setColor('#FF3333')">&nbsp;</ion-col>
    <ion-col style="background:#FF9933" (tap)="setColor('#FF9933')">&nbsp;</ion-col>
    <ion-col style="background:#FFFF33" (tap)="setColor('#FFFF33')">&nbsp;</ion-col>
    <ion-col style="background:#99FF33" (tap)="setColor('#99FF33')">&nbsp;</ion-col>
    <ion-col style="background:#33FF33" (tap)="setColor('#33FF33')">&nbsp;</ion-col>
    <ion-col style="background:#33FF99" (tap)="setColor('#33FF99')">&nbsp;</ion-col>
    <ion-col style="background:#33FFFF" (tap)="setColor('#33FFFF')">&nbsp;</ion-col>
    <ion-col style="background:#3399FF" (tap)="setColor('#3399FF')">&nbsp;</ion-col>
    <ion-col style="background:#3333FF" (tap)="setColor('#3333FF')">&nbsp;</ion-col>
    <ion-col style="background:#9933FF" (tap)="setColor('#9933FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF33FF" (tap)="setColor('#FF33FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF3399" (tap)="setColor('#FF3399')">&nbsp;</ion-col>
    <ion-col style="background:#A0A0A0" (tap)="setColor('#A0A0A0')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#FF6666" (tap)="setColor('#FF6666')">&nbsp;</ion-col>
    <ion-col style="background:#FFB266" (tap)="setColor('#FFB266')">&nbsp;</ion-col>
    <ion-col style="background:#FFFF66" (tap)="setColor('#FFFF66')">&nbsp;</ion-col>
    <ion-col style="background:#B2FF66" (tap)="setColor('#B2FF66')">&nbsp;</ion-col>
    <ion-col style="background:#66FF66" (tap)="setColor('#66FF66')">&nbsp;</ion-col>
    <ion-col style="background:#66FFB2" (tap)="setColor('#66FFB2')">&nbsp;</ion-col>
    <ion-col style="background:#66FFFF" (tap)="setColor('#66FFFF')">&nbsp;</ion-col>
    <ion-col style="background:#66B2FF" (tap)="setColor('#66B2FF')">&nbsp;</ion-col>
    <ion-col style="background:#6666FF" (tap)="setColor('#6666FF')">&nbsp;</ion-col>
    <ion-col style="background:#B266FF" (tap)="setColor('#B266FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF66FF" (tap)="setColor('#FF66FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF66B2" (tap)="setColor('#FF66B2')">&nbsp;</ion-col>
    <ion-col style="background:#C0C0C0" (tap)="setColor('#C0C0C0')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#FF9999" (tap)="setColor('#FF9999')">&nbsp;</ion-col>
    <ion-col style="background:#FFCC99" (tap)="setColor('#FFCC99')">&nbsp;</ion-col>
    <ion-col style="background:#FFFF99" (tap)="setColor('#FFFF99')">&nbsp;</ion-col>
    <ion-col style="background:#CCFF99" (tap)="setColor('#CCFF99')">&nbsp;</ion-col>
    <ion-col style="background:#99FF99" (tap)="setColor('#99FF99')">&nbsp;</ion-col>
    <ion-col style="background:#99FFCC" (tap)="setColor('#99FFCC')">&nbsp;</ion-col>
    <ion-col style="background:#99FFFF" (tap)="setColor('#99FFFF')">&nbsp;</ion-col>
    <ion-col style="background:#99CCFF" (tap)="setColor('#99CCFF')">&nbsp;</ion-col>
    <ion-col style="background:#9999FF" (tap)="setColor('#9999FF')">&nbsp;</ion-col>
    <ion-col style="background:#CC99FF" (tap)="setColor('#CC99FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF99FF" (tap)="setColor('#FF99FF')">&nbsp;</ion-col>
    <ion-col style="background:#FF99CC" (tap)="setColor('#FF99CC')">&nbsp;</ion-col>
    <ion-col style="background:#E0E0E0" (tap)="setColor('#E0E0E0')">&nbsp;</ion-col>
  </ion-row>
  <ion-row>
    <ion-col style="background:#FFCCCC" (tap)="setColor('#FFCCCC')">&nbsp;</ion-col>
    <ion-col style="background:#FFE5CC" (tap)="setColor('#FFE5CC')">&nbsp;</ion-col>
    <ion-col style="background:#FFFFCC" (tap)="setColor('#FFFFCC')">&nbsp;</ion-col>
    <ion-col style="background:#E5FFCC" (tap)="setColor('#E5FFCC')">&nbsp;</ion-col>
    <ion-col style="background:#CCFFCC" (tap)="setColor('#CCFFCC')">&nbsp;</ion-col>
    <ion-col style="background:#CCFFE5" (tap)="setColor('#CCFFE5')">&nbsp;</ion-col>
    <ion-col style="background:#CCFFFF" (tap)="setColor('#CCFFFF')">&nbsp;</ion-col>
    <ion-col style="background:#CCE5FF" (tap)="setColor('#CCE5FF')">&nbsp;</ion-col>
    <ion-col style="background:#CCCCFF" (tap)="setColor('#CCCCFF')">&nbsp;</ion-col>
    <ion-col style="background:#E5CCFF" (tap)="setColor('#E5CCFF')">&nbsp;</ion-col>
    <ion-col style="background:#FFCCFF" (tap)="setColor('#FFCCFF')">&nbsp;</ion-col>
    <ion-col style="background:#FFCCE5" (tap)="setColor('#FFCCE5')">&nbsp;</ion-col>
    <ion-col style="background:#FFFFFF" (tap)="setColor('#FFFFFF')">&nbsp;</ion-col>
  </ion-row>
  </ion-grid>





  `
})
export class ColorpickerPage {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
      console.log(this.background);
    }
  }
  getColorName(background) {
    let colorName = 'white';
    if (!background) return 'white';
    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }
    return colorName;
  }
  setColor(color) {
    this.contentEle.style.backgroundColor = color;
  }
}

@Component({
  selector: 'page-new-pedigree',
  templateUrl: 'new-pedigree.html'
})
export class NewPedigreePage {
  mismascotas;
  mascota;
  path;
  contador = 0;
  succesiones;
  siguientes = [];
  caso;
  linea1;
  linea2;
  linea3;
  linea4;
  color = '#DEDEDE';
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  constructor(public navCtrl: NavController, public navparams: NavParams, public viewCtrl: ViewController, private authservice: AuthProvider,
    private modal: ModalController, private alertCtrl: AlertController, private toastc: ToastController, private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController) {
    setTimeout(() => {
      this.content.nativeElement.style.backgroundColor = this.color;
    }, 300);
    let caso = this.navparams.get('caso');
    if (caso == 1) {
      this.traermismascotas();
      this.caso = 1;
    }
    if (caso == 2) {
      this.caso = 2;

      this.mascota = this.navparams.get('mascota');
      console.log
      this.succesiones = JSON.parse(this.mascota.pedigree);
      console.log(this.succesiones);
      this.linea1 = this.succesiones.linea1;
      this.linea2 = this.succesiones.linea2;
      this.linea3 = this.succesiones.linea3;
      this.color = this.mascota.color_pedigree;

      if (this.mascota.imagenes) {
        let imgname = this.mascota.imagenes.split(',')[0];
        this.path = `${SERVE_FILE_URI}storage/app/${this.mascota.id_usuario}/${this.mascota.id}/${imgname}`
      }
    }
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  traermismascotas() {
    this.authservice.mismascostas(0).subscribe((data) => {
      this.mismascotas = data.json();
    }, err => {
      console.log(err);
    })
  }
  cambiarmascosta() {
    let img = 'assets/img/mascota.png';
    this.linea1 = [
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 }
    ];
    this.linea2 = [
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 }
    ];
    this.linea3 = [
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 }
    ];
    this.linea4 = [
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
      { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 }
    ];
    if (this.mascota.imagenes) {
      let imgname = this.mascota.imagenes.split(',')[0];
      this.path = `${SERVE_FILE_URI}storage/app/${this.mascota.id_usuario}/${this.mascota.id}/${imgname}`

    }
  }


  guardarpedigree() {
    let alert = this.alertCtrl.create({

      title: 'Nombre del pedigree',
      message: 'Es el nombre con el q se identificara el pedigree en su lista de pedigree',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
            if (!data.name) {
              return this.toastmsj('el campo nombre no puede estar vacio');
            } else {
              this.guardarpedigreef(data.name);
            }

          }

        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();

  }
  guardarpedigreef(nombre) {
    let valoresenviar = {
      nombre: nombre,
      mascota_id: this.mascota.id,
      pedigree: JSON.stringify(this.succesiones),
      color: this.color
    }

    let i1 = 0, i2 = 0, i3 = 0;
    this.linea1.forEach(element => {
      if (element.caso == 3) {
        this.authservice.enviarimagenpedigree(element.imagen).then((nom) => {
          this.linea1[i1]['imagen'] = SERVE_FILE_URI + '/' + nom;
        });
      }
      i1 = i1 + 1;

    });

    this.linea2.forEach(element => {
      if (element.caso == 3) {
        this.authservice.enviarimagenpedigree(element.imagen).then((nom) => {
          this.linea2[i2]['imagen'] = SERVE_FILE_URI + '/' + nom;
        });
      }
      i2 = i2 + 1;
    }); this.linea3.forEach(element => {
      if (element.caso == 3) {
        this.authservice.enviarimagenpedigree(element.imagen).then((nom) => {
          element.imagen = SERVE_FILE_URI + '/' + nom;
          this.linea3[i3]['imagen'] = SERVE_FILE_URI + '/' + nom;
        });
      }
      i3 = i3 + 1;
    });
    valoresenviar.pedigree = JSON.stringify({ linea1: this.linea1, linea2: this.linea2, linea3: this.linea3 });
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando datos...',
      duration: 10000
    });
    loading.present();
    console.log(valoresenviar);
    setTimeout(() => {
      this.authservice.registrarpedigree(valoresenviar).finally(() => {
        loading.dismiss();
      }).subscribe((resp) => {
        this.toastmsj(`pedigre ${resp.json()[0]['nombre']} creado exitosamente`);
        this.viewCtrl.dismiss(true);
      }, error => {
        let err = error.json();
        for (let i in err) {
          if (err.hasOwnProperty(i)) {
            this.toastmsj(err[i]);
          }
        }
      });

    }, 4500);
  }
  toastmsj(mensaje = 'mensaje desconocido') {
    const toast = this.toastc.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }


  editaritem(caso, posicion, item) {
    console.log(caso, posicion, item);

    console.log('aqui', caso);
    let ds;
    let modalp;

    modalp = this.modal.create(SuccesionPage, {
      item: item, mismascotas: this.mismascotas, caso: this.caso
    });
    modalp.present();
    modalp.onDidDismiss((data) => {
      console.log(data);
      if (data.successs) {
        if (caso == 'linea1') {
          this.linea1[posicion] = data.itemedited;
        }
        if (caso == 'linea2') {
          this.linea2[posicion] = data.itemedited;
        }
        if (caso == 'linea3') {
          this.linea3[posicion] = data.itemedited;
        }
        if (caso == 'linea4') {
          this.linea4[posicion] = data.itemedited;
        }
      }
    });

  }
  presentPopover(myEvent) {
    console.log(this.content.nativeElement.style.backgroundColor);
    console.log(this.content.nativeElement.style.backgroundImage);
    let popover = this.popoverCtrl.create(ColorpickerPage, {
      contentEle: this.content.nativeElement,
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      console.log(this.content.nativeElement.style.backgroundColor);
      this.color = this.content.nativeElement.style.backgroundColor;
    })
  }


}

