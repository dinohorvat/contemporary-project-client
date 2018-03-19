import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {Comment, ResultDocumentModel} from '../../../model/ResultDocumentModel';
import {AdvanceSearchModel} from '../../../model/AdvanceSearchModel';
import {isNullOrUndefined} from 'util';

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

  comment: Comment = new Comment();
  comments: any = [];

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
      console.log(this.searchService.resultData);
  }

    public getDocument(eventid){
        this.searchService.blockUserInterface();
        Promise.resolve(this.searchService.fetchDocument(eventid)).then(result => {
            this.selectedResult = result;
            console.log(this.selectedResult);
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

    saveComment(){
      this.comments = this.selectedResult.comments;
      if(isNullOrUndefined(this.comments)){
          this.comments = [];
      }
      this.comment.name = "Dino";
      this.comments.push(this.comment);
        this.searchService.blockUserInterface();
        let data = {
            id: this.selectedResult.eventid,
            comments: this.comments
        };
        console.log(this.selectedResult);
        Promise.resolve(this.searchService.updateDocument(data)).then(result => {
            this.searchService.unBlockUserInterface();
            this.cd.markForCheck();
        });
    }

    public getTotalCount(){
      return this.searchService.numResults;
    }

}
