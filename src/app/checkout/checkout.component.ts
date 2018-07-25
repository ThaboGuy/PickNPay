import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart/shared/cart.model';
import { Product } from '../product/shared/product.model';
import { CartInfo } from '../cart/shared/cart-info.model';
import { Router } from '@angular/router';
import { CustomerService } from '../users/shared/customer.service';
import { CartService } from '../cart/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartInfoService } from '../cart/shared/cart-info.service';
import { ProductService } from '../product/shared/product.service';
import { AddressService } from '../address/shared/address.service';
import { CheckoutService } from './shared/checkout.service';
import { NgForm } from '@angular/forms';
import { Checkout } from './shared/checkout.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers:[CartService,CartInfoService,ProductService,CustomerService,AddressService,CheckoutService]

})
export class CheckoutComponent implements OnInit {

  cart: Cart;
  product: Product;
  arr1Length: number;
  arr2Length: number;
  totQ : number = 0;
  totP : number = 0;
  totC: number;
  totalQuantity: number;
  totalP : number;
  totCost: number = 0;
  cartDetails: Array<Cart> = [];
  cartInfo: Array<CartInfo> = [];
  userClaims: any;
  payInfo: any;
  payment: Checkout;
  constructor(private router: Router,private customerService: CustomerService,private cartService : CartService,private toastr : ToastrService,private cartInfoService : CartInfoService,private productService : ProductService,private paymentService:CheckoutService) { }


  ngOnInit() {
    
    this.payInfo = {
     eft: 'EFT',
     credit: 'CreditOrDebit'
    }
    
     this.paymentService.getPaymentList().subscribe((data:any)=>{
        this.payment =  Object.assign({},data.json());
        
        localStorage.setItem("PaymentID",this.payment.PaymentID+'')
        
        
        console.log(+localStorage.getItem("PaymentID"));
      });
    this.resetForm();
    this.productService.getProductList();
    this.cartService.getCartList();
    this.cartInfoService.getCartInfoList();

     this.cartService.cartList.subscribe((cArray:Array<Cart>)=>{
       this.cartDetails = cArray;
       if(cArray.length > 0)
       {
         this.arr1Length = cArray.length;
         this.totalQuantity = this.totalCart();
        
       }
     });

     this.cartInfoService.cartListInfo.subscribe((cartArray:Array<CartInfo>)=>{
       this.cartInfo = cartArray;
       if(cartArray.length > 0){
        this.arr2Length = cartArray.length;
        this.totalP = this.totalPrice() * this.totalQuantity; 
        //this.totCost =  this.totalCost();
         
       }
      
     })
    

     this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
     
    });
  
   
  }

  totalCart(){
  
    for(var counter = 0;counter<this.arr1Length;counter++){
     
      this.totQ += this.cartDetails[counter].CartQuantity;
     }
      
  return this.totQ;
  }
 
  totalPrice(){

    for(var counter = 0;counter<this.arr2Length;counter++){
     
      this.totP += this.cartInfo[counter].Price;
     }
      
  return this.totP;
  }
  resetForm(form? : NgForm) {
    if (form != null)
  
      form.reset();
     this.paymentService.selectedPayment = {
      PaymentID :0,
      CustID: +localStorage.getItem("CustID"),
      PaymentType : this.payInfo,
      
    }
  }
  onSubmit(form : NgForm) {
    console.log(+localStorage.getItem("PaymentID"));
    this.paymentService.selectedPayment = {
      PaymentID : +localStorage.getItem("PaymentID"),
      CustID: +localStorage.getItem("CustID"),
      PaymentType : this.payInfo,
      
    }
    if((document.getElementById('radio120') as HTMLInputElement).checked){
      this.paymentService.getPaymentList().subscribe((data:any)=>{
        this.payment =  Object.assign({},data.json());
        this.paymentService.PutPayment(this.payment.PaymentID, form.value)
        
        .subscribe( data => {
         this.resetForm(form);
         this.router.navigate(["/eft"]);
         this.toastr.info('Updated successfully!');
        
         
        })
       },(err: ErrorEventHandler)=>{
       this.paymentService.PostPayment(form.value).subscribe(data=> {
         this.resetForm(form);
        this.paymentService.getPaymentList().subscribe((data:any)=>{
         this.payment = Object.assign({},data.json());
       });
       this.router.navigate(["/eft"]);
        this.toastr.success('Added Successfully!');
       
       
   
     })
   })
    }else  if((document.getElementById('radio121') as HTMLInputElement).checked){
      this.paymentService.getPaymentList().subscribe((data:any)=>{ 
        this.payment = data.json();

        this.paymentService.PutPayment(this.payment.PaymentID, form.value)
        .subscribe( data => {
         this.resetForm(form);
         this.router.navigate(["/credit"]);
         this.toastr.info('Updated successfully!');
        
         
        })
       },(err: ErrorEventHandler)=>{
       this.paymentService.PostPayment(form.value).subscribe(data=> {
         this.resetForm(form);
        this.paymentService.getPaymentList().subscribe((data:any)=>{
         this.payment = data.json();
       });
       this.router.navigate(["/credit"]);
        this.toastr.success('Added Successfully!');
       
       
   
     })
   })
    }
     
   
  }
 

    
  
  }
