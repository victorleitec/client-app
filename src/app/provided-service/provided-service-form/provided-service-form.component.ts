import {Component, OnInit} from '@angular/core';
import {Client} from "../../customers/client";
import {CustomersService} from "../../customers.service";
import {ProvidedService} from "../providedService";
import {ProvidedServiceService} from "../../provided-service.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-provided-service-form',
  templateUrl: './provided-service-form.component.html',
  styleUrls: ['./provided-service-form.component.css']
})
export class ProvidedServiceFormComponent implements OnInit {

  customers: Client[] = []
  service: ProvidedService
  success: boolean = false
  errors: String[]

  constructor(private clientService: CustomersService,
              private serviceProvided: ProvidedServiceService,
              private router: Router
  ) {
    this.service = new ProvidedService()
  }

  ngOnInit(): void {
    this.clientService
      .getCustomers()
      .subscribe(response => this.customers = response)
  }

  onSubmit() {
    this.serviceProvided
      .save(this.service)
      .subscribe(response => {
          this.success = true
          this.errors = null
          this.service = new ProvidedService()
          Swal.fire(
            'SUCESSO',
            'Serviço salvo!',
            'success'
          )
        }, errorResponse => {
          this.success = false
          this.errors = errorResponse.error.errors
          Swal.fire({
            title: 'ERRO',
            html: 'Falha ao tentar salvar o serviço!',
            icon: 'error'
          })
        }
      )
  }
}
