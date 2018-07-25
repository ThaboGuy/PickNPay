import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../shared/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  constructor(private router: Router,private supplierService : SupplierService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.supplierService.selectedSupplier = {
      InventorySupplier1 : 0,
      FirstName: '',
      Email: '',
      Password: ''
     
    }
  }
  onSubmit(form: NgForm){
    if(form.value.SupplierID == 0){

    
    this.supplierService.PostSupplier(form.value)
    .subscribe(data => {
        this.resetForm(form);
        this.supplierService.getSupplierList();
        this.toastr.success('Registered Successfully','Supplier');               
     });
    }else 
    {
   //Update
        this.supplierService.PutSupplier(form.value.SupplierID, form.value).subscribe(data=> {
        this.resetForm(form);
       this.supplierService.getSupplierList();
       this.toastr.info('Updated Successfully!');
  });

    }

}
}