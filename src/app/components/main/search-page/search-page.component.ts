import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goSearch(){
    //search service call code here
    this.router.navigate(['main'])
  }
}
