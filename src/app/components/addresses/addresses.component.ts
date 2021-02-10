import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressesService } from 'src/app/services/addresses.service';
import { AddressRequest } from 'src/app/shared/models/requests/address-request';
import { AddressResponse } from 'src/app/shared/models/responses/address-response';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  clientId: number = 0;
  addressForm: FormGroup;
  addresses: AddressResponse[];
  constructor(private formBuilder: FormBuilder, 
    private addressService: AddressesService,
    private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.clientId = navigation?.extras?.state?.clientId;
    }

  ngOnInit(): void {
    if(this.clientId === undefined){
      this.router.navigate(['/clients']);
    }else{
      this.getAddresses();
    }
    this.initForm();
  }

  private initForm(): void{
    this.addressForm = this.formBuilder.group({
      City: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      Country: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      PostalCode: ["", [Validators.pattern("[0-9]*")]]
    });
  }

  getAddresses(): void{
    this.addressService.getAddresses(this.clientId).subscribe(result=>{
      if(result){
        this.addresses = result;
      }
    }, error =>{
      if(error)
        console.error(error.text);
    });
  }

  isValidField(field: string):string{
    const validatedField = this.addressForm.get(field);

    return (!validatedField.valid && validatedField.touched) ?
    'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  saveAddress():void{
    if(this.addressForm.valid){
      const address: AddressRequest = {
        addressId: 0,
        city: this.addressForm.value.City,
        country: this.addressForm.value.Country,
        postalCode: this.addressForm.value.PostalCode,
        clientId: this.clientId
      };
      this.addressService.saveAddress(address).subscribe(result=>{
        if(result){
          alert('Dirección guardada correctamente');
          this.getAddresses();
          this.addressForm.reset();
        }
      },error=> { 
          console.log(error.text);
      });
    }
  }

}
