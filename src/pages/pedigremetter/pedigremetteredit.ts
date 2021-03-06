import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DetallesimgPage } from './detallesimg';
import { Screenshot } from '@ionic-native/screenshot';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

@Component({
  selector: 'page-colorpicker2',
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
export class ColorpickerPage2 {
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
  selector: 'page-pedigremetteredit',
  templateUrl: 'pedigremetteredit.html',
})
export class PedigremettereditPage {
  screen: any;
  state: boolean = false;
  items;
  myInput;
  linea0;
  linea1;
  linea2;
  linea3;
  estado = true
  color = '#DEDEDE';
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  constructor(
    private screenshot: Screenshot,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authservice: AuthProvider,
    public modal: ModalController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    private base64ToGallery: Base64ToGallery
  ) {
    setTimeout(() => {
      this.content.nativeElement.style.backgroundColor = this.color;
    }, 300);


    let datos = this.navParams.get('data');
    let unirp = this.navParams.get('unirp');
    this.linea1 = [];
    this.linea2 = [];
    this.linea3 = [];
    let img = 'http://66.175.220.111/assets/placeholder2.png';
    if (unirp) {
      this.linea0 = {
        nombre: '',
        imagen: img
      }
      this.linea1.push({
        nombre: datos.root_canine_1.nombre,
        imagen: `http://66.175.220.111${datos.root_canine_1.img}`
      });
      this.linea1.push({
        nombre: datos.root_canine_2.nombre,
        imagen: `http://66.175.220.111${datos.root_canine_2.img}`
      });
      let i=0;
      datos.canines.forEach(element => {
        if (element.level == 1 && i < 2) {
          this.linea2.push({ nombre: element.nombre, imagen: `http://66.175.220.111${element.img}`, caso: 1, raza: element.race, sexo: (element.sex == 1 ? 'Macho' : 'Hembra') });
          i=i+1;
        }
      });
      for (let index = 0; index < 2-i; index++) {
        this.linea2.push({ nombre: '', imagen: img, caso: 1 });        
      }
      let i2=0;
      datos.canes.forEach(element => {
        if (element.level == 1 && i2 < 2) {
          this.linea2.push({ nombre: element.nombre, imagen: `http://66.175.220.111${element.img}`, caso: 1, raza: element.race, sexo: (element.sex == 1 ? 'Macho' : 'Hembra') });
          i2=i2+1;
        }
      });
      for (let index = 0; index < 2-i2; index++) {
        this.linea2.push({ nombre: '', imagen: img, caso: 1 });        
      }
    } else {
      this.linea0 = {
        nombre: datos.root_canine.nombre,
        imagen: `http://66.175.220.111${datos.root_canine.img}`
      }

      datos.canines.forEach(element => {
        if (element.level == 1) {
          this.linea1.push({ nombre: element.nombre, imagen: `http://66.175.220.111${element.img}`, caso: 1, raza: element.race, sexo: (element.sex == 1 ? 'Macho' : 'Hembra') });
        }
        if (element.level == 2) {
          this.linea2.push({ nombre: element.nombre, imagen: `http://66.175.220.111${element.img}`, caso: 1, raza: element.race, sexo: (element.sex == 1 ? 'Macho' : 'Hembra') });
        }
        if (element.level == 3 || element.level == 4) {
          this.linea3.push({ nombre: element.nombre, imagen: `http://66.175.220.111${element.img}`, caso: 1, raza: element.race, sexo: (element.sex == 1 ? 'Macho' : 'Hembra') });
        }

      });
    }
    if (this.linea1.length == 0) {
      this.linea1 = [
        { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 }
      ];
    }
    if (this.linea2.length == 0) {
      this.linea2 = [
        { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 },
        { nombre: '', imagen: img, caso: 1 }, { nombre: '', imagen: img, caso: 1 }
      ];

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedigremetterPage');
  }
  onInput($event) {
    this.buscarporclave($event.target.value);
  }

  onCancel($event) {
    this.buscarporclave($event.target.value);
  }
  buscarporclave(clave) {
    if (!clave) {
      return "";
    }
    if (clave.length < 2) {
      return "";
    }
    this.authservice.mascotasmetter(clave).subscribe((data) => {

      this.items = data;
      console.log(data);
    });
  }


  verpedigree(item) {
    console.log('item', item);
    this.authservice.pedigreemetter(parseInt(item.id)).subscribe((data) => {
      console.log(data);
    });
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ColorpickerPage2, {
      contentEle: this.content.nativeElement,
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      //console.log(this.content.nativeElement.style.backgroundColor);
      this.color = this.content.nativeElement.style.backgroundColor;
    })
  }

  editaritem(caso, posicion, item) {
    let modalp;
    let sexo='B';
    console.log('posicion',posicion);
    console.log('caso',caso);
    if(caso != 'linea0'){
      console.log('xASO2',caso);
      if(posicion==0 || posicion==2|| posicion==4 || posicion==6 || posicion==8 ||posicion==10){
        sexo='M';
      }else{
        sexo='F';        
      }
    }
    console.log('seo',sexo);
    modalp = this.modal.create(DetallesimgPage, {
      item: item, caso: 1,sexo:sexo
    });
    modalp.present();
    modalp.onDidDismiss((data) => {
      //console.log('datos de regreso', data);
      if (data.successs) {
        if (caso == 'linea0') {
          this.linea0 = data.itemedited;
        }
        if (caso == 'linea1') {
          this.linea1[posicion] = data.itemedited;
        }
        if (caso == 'linea2') {
          this.linea2[posicion] = data.itemedited;
        }
        if (caso == 'linea3') {
          this.linea3[posicion] = data.itemedited;
        }

      }
    });

  }

  screenShot() {
    this.estado = false;
    setTimeout(() => {
      this.screenshot.URI(100).then(res => {
        this.screen = res.URI;
        this.state = true;
        this.estado = true;

          this.base64ToGallery.base64ToGallery(res.URI.replace('data:image/jpeg;base64,','data:image/png;base64,'),{ prefix: '_img',mediaScanner:true }).then((ok)=>{
            this.toastmsj('Pedigree generado y guardado exitosamente');
          },er=>{
            this.toastmsj('Error guardando pedigree');
          });
 
      },err=>{
        this.toastmsj('Error guardando pedigree');
      }).catch((err)=>{
        this.toastmsj('Error guardando pedigree');
      })
    }, 500);
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  toastmsj(msj: string) {

    const toast = this.toastCtrl.create({
      message: msj,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
