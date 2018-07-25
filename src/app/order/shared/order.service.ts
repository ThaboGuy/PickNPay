import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
  readonly rootUrl = 'http://localhost:61973/';
  order : Order;
  selectedOrder : Order;

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostOrder(ord : Order){
    var body = JSON.stringify(ord);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Order',body,requestOptions).map(x => x.json());
  }
  

  GetOrder(){
    return this.http.get(this.rootUrl+'api/GetOrder?id='+localStorage.getItem("CustID"));
  }

}
