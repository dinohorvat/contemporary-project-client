import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../../../services/search.service';

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
    if(this.text.length > 0){

    Promise.resolve(this.searchService.searchText(this.text)).then(result => {
      let res: any = result;
      console.log(res);
      this.router.navigate(['main'])
    });
    }
  }
}
