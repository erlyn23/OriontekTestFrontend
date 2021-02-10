import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientRequest } from '../shared/models/requests/client-request';
import { ClientResponse } from '../shared/models/responses/client-response';

const httpOptions = {headers: new HttpHeaders({"content-type": "application/json"})}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url: string = environment.endpoints.clients;
  constructor(private _http:HttpClient) { }

  getClients(): Observable<ClientResponse[]>{
    return this._http.get<ClientResponse[]>(this.url, httpOptions);
  }

  saveClient(client: ClientRequest): Observable<ClientRequest>{
    return this._http.post<ClientRequest>(this.url, client, httpOptions);
  }

  updateClient(client: ClientRequest): Observable<ClientResponse>{
    return this._http.put<ClientResponse>(this.url, client, httpOptions);
  }

  deleteClient(clientId: number): Observable<ClientResponse>{
    return this._http.delete<ClientResponse>(`${this.url}/${clientId}`, httpOptions);
  }
}
