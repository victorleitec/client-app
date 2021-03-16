import { Component, AfterViewInit} from '@angular/core';
// @ts-ignore
import jQuery from "jquery";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit{

  constructor() { }

  ngAfterViewInit() {
    (function($) {
      "use strict";

      const path = window.location.href;
      $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        // @ts-ignore
        if (this.href === path) {
          // @ts-ignore
          $(this).addClass("active");
        }
      });

      // Toggle the side navigation
      // @ts-ignore
      $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
      });
    })(jQuery);

  }

}
