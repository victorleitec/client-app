import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProvidedService} from "./provided-service/providedService";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {ProvidedServiceSearch} from "./provided-service/provided-service-list/providedServiceSearch";

@Injectable({
  providedIn: 'root'
})
export class ProvidedServiceService {

  apiURL: string = environment.apiURLBase + '/api/provided-services'

  constructor(private http: HttpClient) {
  }

  save(providedService: ProvidedService) : Observable<ProvidedService> {
    return this.http.post<ProvidedService>(this.apiURL, providedService)
  }

  search(name: string, month: number) : Observable<ProvidedServiceSearch> {
    const httpParams = new HttpParams()
      .set("name", name)
      .set("month",month ? month.toString() : '')

    const url = this.apiURL + "?" + httpParams.toString()
    return this.http.get<any>(url)
  }

}
