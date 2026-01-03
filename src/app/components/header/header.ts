import { Component } from '@angular/core';
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [ RouterLinkActive, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
