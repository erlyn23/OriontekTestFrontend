import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientRequest } from 'src/app/shared/models/requests/client-request';
import { ClientResponse } from 'src/app/shared/models/responses/client-response';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clientForm: FormGroup;
  clients: ClientResponse[];
  navigationExtras: NavigationExtras = {state: { clientId: 0 }};
  isEditClient: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private clientService: ClientsService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.getClients();
  }

  private initForm(): void{
    this.clientForm = this.formBuilder.group({
      ClientId: [""],
      FirstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      LastName: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  getClients(){
    this.clientService.getClients().subscribe(result=>{
      if(result){
        this.clients = result;
      }
    });
  }
  
  isValidField(field: string): string{
    const validatedField = this.clientForm.get(field);

    return (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid' : '';
  }

  saveClient(): void{
    if(this.clientForm.valid){
      const client: ClientRequest = {
        clientId: 0,
        firstName: this.clientForm.value.FirstName,
        lastName: this.clientForm.value.LastName
      };

      this.clientService.saveClient(client).subscribe(result=>{
        if(result){
          alert('Cliente guardado correctamente');
          this.getClients();
          this.clientForm.reset();
        }
      }, error=>{
          alert(error.text);
      });
    }
  }

  fillClientFormWithData(index: number): void{
    this.isEditClient = true;
    this.clientForm.controls.ClientId.setValue(this.clients[index].clientId);
    this.clientForm.controls.FirstName.setValue(this.clients[index].firstName);
    this.clientForm.controls.LastName.setValue(this.clients[index].lastName);
  }

  updateClient():void{
    if(this.clientForm.valid){
      const client: ClientRequest = {
        clientId: this.clientForm.value.ClientId,
        firstName: this.clientForm.value.FirstName,
        lastName: this.clientForm.value.LastName
      };

      this.clientService.updateClient(client).subscribe(result=>{
        if(result){
          alert('Cliente modificado correctamente');
          this.getClients();
          this.clientForm.reset();
          this.isEditClient = false;
        }
      }, error => { 
        console.error(error.text) 
      });
    }
  }

  deleteClient(index: number): void{
    const confirmDelete = confirm('¿Estás seguro de querer eliminar este cliente?');

    if(confirmDelete){
      const clientId = this.clients[index].clientId;

      this.clientService.deleteClient(clientId).subscribe(result=>{
        if(result){
          alert('Cliente eliminado correctamente');
          this.getClients();
        }
      }, error =>{
          console.error(error.text);
      });
    }
  }

  goToAddresses(index: number): void{
    const clientId: number = this.clients[index].clientId;
    this.navigationExtras.state.clientId = clientId;
    this.router.navigate(['/addresses'], this.navigationExtras);
  }

}
