import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class CartService {

 
  cart : Cart;
  //cartList : Cart[];
  cartList: Subject<Array<Cart>> = new BehaviorSubject<Array<Cart>>([])

  readonly rootUrl = 'http://localhost:61973/';

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostCart(cart : Cart) {
    var body = JSON.stringify(cart);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Carts', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  PutCart(id, cart) {
    var body = JSON.stringify(cart);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Carts/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  DeleteCart(id : number) {
    return this.http.delete(this.rootUrl + 'api/Carts/' + id).map(res => res.json());
  }

  getCartList() {
    this.http.get(this.rootUrl + 'api/Carts?id='+localStorage.getItem("CustId"))
    .map((res: any)=>{
      return res.json();
    }).subscribe((data: any)=>{
      this.cartList.next(data);
    })
  }

}
