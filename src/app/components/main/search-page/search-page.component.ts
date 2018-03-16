import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../../../services/search.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  text: string = "";


  constructor(private router: Router, private searchService: SearchService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public goSearch(){
    //search service call code here
    if(!isNullOrUndefined(this.text) && this.text.length > 0){
    this.searchService.query = this.text;
    this.searchService.blockUserInterface();

    let startTime = (new Date).getTime();
    Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
        this.searchService.unBlockUserInterface();
        this.cd.markForCheck();
        let endTime = (new Date).getTime();

        this.searchService.timeElapsed = endTime - startTime;

     });
    this.router.navigate(['main'])
    }
  }
}
