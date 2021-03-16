import {Component, OnInit} from '@angular/core';
import {ProvidedServiceSearch} from "./providedServiceSearch";
import {ProvidedServiceService} from "../../provided-service.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-provided-service-list',
  templateUrl: './provided-service-list.component.html',
  styleUrls: ['./provided-service-list.component.css']
})
export class ProvidedServiceListComponent implements OnInit {

  name: string = ""
  month: number
  months: number[]
  list: ProvidedServiceSearch[]
  message: string

  constructor(
    private service: ProvidedServiceService
  ) {
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  ngOnInit(): void {
  }

  consultar() {
    this.service.search(this.name, this.month)
      .subscribe(response => {
        // @ts-ignore
        this.list = response
        if (this.list.length <= 0) {
          this.message = "Nenhum registro encontrado."
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Nenhum registro encontrado.',
            showConfirmButton: false,
            timer: 1500
          })
        } else  {
          this.message = null;
        }
      })
  }
}
