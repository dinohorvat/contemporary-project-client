import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {ResultDocumentModel} from '../../../model/ResultDocumentModel';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnInit {

  results: ResultDocumentModel[] = new Array();
  display: boolean = false;



  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this.performSearch();
  }

  public performSearch(){
      this.searchService.blockUserInterface();
      Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
          this.results = result;
          this.cd.markForCheck();
          this.searchService.unBlockUserInterface();
      });
  }

    showDialog() {
        this.display = true;
    }

    getResultData(){
        return this.searchService.resultData;
    }

}
