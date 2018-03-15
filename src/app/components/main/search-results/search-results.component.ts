import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {ResultDocumentModel} from '../../../model/ResultDocumentModel';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  results: ResultDocumentModel[] = new Array();



  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this.performSearch();
  }

  public performSearch(){
      Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
          this.results = result;
          this.cd.markForCheck();
      });
  }

}
