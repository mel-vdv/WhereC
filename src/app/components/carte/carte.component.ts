import { ApicrudService } from './../../services/apicrud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  constructor(
    private api: ApicrudService
  ) { }
  //---------------------
  maLat: any;
  maLong: any;
  maCarte: any;
  moi: any;
  marqueursWc: any = [];
  wc$: any;
  infosVis:boolean;
  //----------
  //les infos:
  adresse:string;
  payant: boolean;
  pmr: boolean;
  horaires: string;
  //-----------------------
  ngOnInit(): void {
    this.infosVis=false;
    this.getAllWc();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.maLat = position.coords.latitude; this.maLong = position.coords.longitude;
        this.mapDepart();
      })

    }
    else {
      console.log("merci d'activer votre geoloc");
    }
  }

  //------------------------
  mapDepart() { //pas necessaire de mettre appendchild, cartediv est deja le contenant:
    let carteDiv = document.getElementById('carte');
    this.maCarte = new google.maps.Map(carteDiv,
      {
        center: { lat: this.maLat, lng: this.maLong },
        zoom: 14
      }
    );
    this.ouSuisJe();

  }
  //-------------
  ouSuisJe() {
    let map = this.maCarte;
    this.moi = new google.maps.Marker({

      position: { lat: this.maLat, lng: this.maLong },
      map,
      icon: {
        url: ('./../../../assets/moi-redim.png')
      }
    });
  }
  //-----------------
  getAllWc() {
    this.api.getAllToilets().subscribe((data: any) => {
      this.wc$ = data.records;
      this.ouSontWc();

    });
  }
  //-----------------
  ouSontWc() {
    this.wc$.forEach((e: any) => {
      let map = this.maCarte;
      let la = e.record.fields.wgs84_lalo.lat;
      let lo = e.record.fields.wgs84_lalo.lon;
      let marqueurWcx = new google.maps.Marker({
        position: { lat: la, lng: lo },
        map,
        icon: {
          url: ('./../../../assets/wc-loc.png')
        }
      });
      marqueurWcx.addListener ('click',()=>{
        this.afficherInfo(la,lo);
      });
      this.marqueursWc.push(marqueurWcx);
    });
  }
  //------------------------
  afficherInfo(lat:any, long:any){
this.api.getByCoord(lat,long).subscribe((data:any)=>{
this.adresse = data.records[0].record.fields.adrvoisfr;
this.payant = data.records[0].record.fields.gratuite;
this.horaires = data.records[0].record.fields.heureouv;
this.pmr = data.records[0].record.fields.pmr;
});
this.infosVis=true;
  }

}
