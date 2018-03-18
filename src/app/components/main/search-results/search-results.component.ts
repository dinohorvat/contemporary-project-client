import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {ResultDocumentModel} from '../../../model/ResultDocumentModel';
import {AdvanceSearchModel} from '../../../model/AdvanceSearchModel';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnInit {

  p: number = 1;
  display: boolean = false;
  selectedResult: ResultDocumentModel = new ResultDocumentModel();

  comments: string;


  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
      console.log(this.searchService.resultData);
  }

    public getDocument(eventid){
        this.searchService.blockUserInterface();
        Promise.resolve(this.searchService.fetchDocument(eventid)).then(result => {
            this.selectedResult = result;
            this.searchService.unBlockUserInterface();
            this.showDialog();
            this.cd.markForCheck();
        });
    }

    showDialog() {
      this.display = true;
    }

    getResultData(){
        return this.searchService.resultData;
    }

    getPage(page: number){
      console.log("num " + page);

        this.searchService.blockUserInterface();
        Promise.resolve(this.searchService.fetchPage(page, this.searchService.query)).then(result => {
            this.searchService.unBlockUserInterface();
            this.cd.markForCheck();
            this.p = page;

        });
    }

    public getTotalCount(){
      return this.searchService.numResults;
    }

}
