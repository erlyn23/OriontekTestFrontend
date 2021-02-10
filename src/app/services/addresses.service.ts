import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressRequest } from '../shared/models/requests/address-request';
import { AddressResponse } from '../shared/models/responses/address-response';

const httpOptions = {headers: new HttpHeaders({"content-type": "application/json"})}


@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  private url: string = environment.endpoints.addresses;
  constructor(private _http: HttpClient) { }

  getAddresses(clientId: number): Observable<AddressResponse[]>{
    return this._http.get<AddressResponse[]>(`${this.url}/${clientId}`, httpOptions);
  }

  saveAddress(address: AddressRequest): Observable<AddressRequest>{
    return this._http.post<AddressRequest>(this.url, address, httpOptions);
  }
}
