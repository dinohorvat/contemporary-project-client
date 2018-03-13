import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../../services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  results: any[] = new Array();

  constructor(private searchService: SearchService) { }

  ngOnInit() {

    this.results = [1,2,3,4,5,6,7,8,9,10];
    this.searchService.numResults = this.results.length;

  }

}
