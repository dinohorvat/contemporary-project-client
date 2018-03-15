import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../../../services/search.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  text: string;


  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit() {
  }

  public goSearch(){
    //search service call code here
    if(!isNullOrUndefined(this.text) && this.text.length > 0){


    this.searchService.query = this.text;
    this.router.navigate(['main'])
    }
  }
}
