import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../../../services/search.service';
import {isNullOrUndefined} from 'util';
import {AdvanceSearchModel} from '../../../model/AdvanceSearchModel';
import {LocationModel} from '../../../model/LocationModel';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  text: string = "";

  displayAdvanceSearch = false;
  advanceSearch: AdvanceSearchModel = new AdvanceSearchModel();


  constructor(private router: Router, private searchService: SearchService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public querySearch(){
    //search service call code here
    if(!isNullOrUndefined(this.text) && this.text.length > 0){
    this.searchService.query = this.text;
    this.searchService.blockUserInterface();

    this.searchService.geoSearch = false;

    let startTime = (new Date).getTime();
    Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
        this.searchService.unBlockUserInterface();
        this.cd.markForCheck();
        let endTime = (new Date).getTime();

        this.searchService.timeElapsed = endTime - startTime;
        this.router.navigate(['main'])

     });
    }
  }

  public searchArea(){
      this.searchService.blockUserInterface();
      let startTime = (new Date).getTime();

      let area = new LocationModel();
      area.radius = parseFloat(this.advanceSearch.radius);
      area.long = parseFloat(this.advanceSearch.longitude);
      area.lat = parseFloat(this.advanceSearch.latitude);

      this.searchService.geoSearch = true;
      this.searchService.geoQuery = area;

      Promise.resolve(this.searchService.fetchArea(area).then(res =>{
          this.searchService.unBlockUserInterface();
          this.cd.markForCheck();
          let endTime = (new Date).getTime();

          this.searchService.timeElapsed = endTime - startTime;
          this.router.navigate(['main'])

      }).catch(err => {
          console.log(err);
      }));
  }
}
