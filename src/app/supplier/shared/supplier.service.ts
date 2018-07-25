import { Injectable } from '@angular/core';
import { Supplier } from './supplier.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class SupplierService {

  readonly rootUrl =  'http://localhost:61973/';
  selectedSupplier : Supplier;
  SupplierList: Supplier[]
  constructor(private http : Http, private httpClient : HttpClient) { }

  PostSupplier(sup : Supplier){
    var body = JSON.stringify(sup);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/InventorySuppliers',body,requestOptions).map(x => x.json());
  }
  PutSupplier(id, sup){
    var body = JSON.stringify(sup);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/InventorySuppliers/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
  DeleteSupplier(id: number){
    return this.http.delete(this.rootUrl +'api/InventorySuppliers/'+id).map(res=>res.json());
  }

  getSupplierList(){
    this.http.get(this.rootUrl+'api/InventorySuppliers').map((data:Response)=>{
      return data.json() as Supplier[];
    }).toPromise().then(x=>{
      this.SupplierList = x;
    })
  }

}