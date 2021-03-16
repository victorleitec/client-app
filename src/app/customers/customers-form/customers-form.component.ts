import {Component, OnInit} from '@angular/core';
import {Client} from "../client";
import {CustomersService} from "../../customers.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  client: Client;
  success: boolean = false;
  errors: String[];

  constructor(
    private service: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.client = new Client();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params
    // @ts-ignore
    if (params && params.value && params.value.id) {
      // @ts-ignore
      this.id = params.value.id
      this.service
        // @ts-ignore
        .getClientById(this.id)
        .subscribe(response => this.client = response,
          errorResponse => this.client = new Client())
    }
  }

  onSubmit() {
    // @ts-ignore
    if (this.id) {
      this.service
        .update(this.client)
        .subscribe(response => {
          this.success = true
          // @ts-ignore
          this.errors = null

          Swal.fire(
            'SUCESSO',
            'Cliente atualizado!',
            'success'
          )
          this.router.navigate(['customers/list'])

        }, errorResponse => {
          Swal.fire(
            'ERRO',
            'Nome e/ou CPF inválido(s)!',
            'error'
          )
        })

    } else {
      this.service
        .save(this.client)
        .subscribe(response => {
          this.success = true;
          // @ts-ignore
          this.errors = null;
          this.client = response;

          Swal.fire(
            'SUCESSO',
            'Cliente salvo!',
            'success'
          )

          this.router.navigate(['customers/list'])
        }, errorResponse => {
          Swal.fire(
            'ERRO',
            'Nome e/ou CPF inválido(s)!',
            'error'
          )
        })
    }
  }

      backToList()
      {
        this.router.navigate(['customers/list'])
      }

      showModalSucess()
      {
        // @ts-ignore

        this.router.navigate(['customers/list'])
      }
    }
