import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from '../cart/shared/cart.service';
import { CustomerService } from '../users/shared/customer.service';
import { ProductService } from '../product/shared/product.service';
import { AddressService } from './shared/address.service';
import { NgForm } from '@angular/forms';
import { Address } from './shared/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers:[CartService,CustomerService,AddressService]
})
export class AddressComponent implements OnInit {
  userClaims: any;


  constructor(private toastr : ToastrService,private router: Router,private cartService: CartService,private customerService : CustomerService,private addressService : AddressService) { }

  ngOnInit() {
    this.resetForm();
    this.addressService.getAddressList().subscribe((data: any) =>{
      this.addressService.selectedAddress = Object.assign({},data.json());
    });
     

    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
  }
    
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
    this.addressService.selectedAddress = {
      AddressID : 0,
      CustID: +localStorage.getItem("CustID"),
      RecipientName : '',
      ContactNum : '',
      AddressType : '',
      StandNo : '',
      StreetAddress : '',
      Suburb: '',
      City: '',
      PostalCode: '' 
    }
  }
  
  onSubmit(form : NgForm) {
    if(form.value.AddressID === 0){
      this.addressService.PostAddress(form.value)
      .subscribe( data => {
       this.resetForm(form);
       this.addressService.getAddressList();
        this.toastr.success('Address added successfully!');
      })
    }else{
      this.addressService.PutAddress(form.value.AddressID, form.value).subscribe(data=> {
        this.resetForm(form);
       this.addressService.getAddressList();
       this.toastr.info('Updated Successfully!');
  });

    }
      
    }
   
}
