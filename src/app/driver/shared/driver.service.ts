import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class DriverService {
  readonly rootUrl = 'http://localhost:61973/';
  selectedDriver : Driver;
  driverList: Driver[]
  constructor(private http : Http, private httpClient : HttpClient) { }

  PostDriver(drv : Driver){
    var body = JSON.stringify(drv);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Drivers',body,requestOptions).map(x => x.json());
  }
  PutDriver(id, drv){
    var body = JSON.stringify(drv);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/Drivers/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
  DeleteDriver(id: number){
    return this.http.delete(this.rootUrl +'api/Drivers/'+id).map(res=>res.json());
  }

  getDriverList(){
    this.http.get(this.rootUrl+'api/Drivers').map((data:Response)=>{
      return data.json() as Driver[];
    }).toPromise().then(x=>{
      this.driverList = x;
    })
  }

}
