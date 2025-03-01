import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-selling',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './selling.component.html',
  styleUrl: './selling.component.scss'
})
export class SellingComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


}
