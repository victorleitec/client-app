import {Component, OnInit} from '@angular/core';
import {Client} from "../client";
import {CustomersService} from "../../customers.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: Client[] = [];
  selectedClient: Client;

  constructor(private service: CustomersService, private router: Router) {
  }

  ngOnInit(): void {
    this.service
      .getCustomers()
      .subscribe(answer => this.customers = answer);
  }

  newRegister() {
    this.router.navigate(['/customers/form'])
  }

  showModalDelete(client: Client) {
    this.selectedClient = client
    Swal.fire({
        title: 'CONFIRMAÇÃO',
        text: 'Confirma a delação do(a) Cliente: ' + client.name + '?',
        icon: "warning",
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'green',
        showCancelButton: true,
        cancelButtonColor: 'lightgrey',
        iconColor: "red"
      }
    ).then((result) => {
      if(result.isConfirmed) {
        this.service
          .delete(this.selectedClient)
          .subscribe(response => {

            Swal.fire(
              'SUCESSO',
              'Cliente deletado!',
              'success'
            )
            this.ngOnInit()

          }, errorResponse => {
            Swal.fire(
              'ERRO',
              'Ocorreu um problema ao tentar deletar o cliente!',
              'error'
            )
          })
      }
    })
  }
}
