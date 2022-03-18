import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(
    private http: HttpClient
  ) { }

  getAllToilets(){
    return this.http.get("https://opendata.bruxelles.be/api/v2/catalog/datasets/bruxelles_toilettes_publiques/records?limit=78&offset=0&timezone=UTC") as Observable<any>;
      }
      //------------------

  getByCoord(lat:any,long:any){
 return this.http.get(`https://opendata.bruxelles.be/api/v2/catalog/datasets/bruxelles_toilettes_publiques/records?where=wgs84_long%20like%20%22${long}%22%20AND%20wgs84_lat%20like%20%22${lat}%22&limit=10&offset=0&timezone=UTC`) as Observable<any>;
  }
}
