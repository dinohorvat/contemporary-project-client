import {Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {AdvanceSearchModel} from '../../model/AdvanceSearchModel';
import {LocationModel} from '../../model/LocationModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    queryText: string = this.searchService.query;
    area: LocationModel;

    displayAdvanceSearch = false;
    advanceSearch: AdvanceSearchModel = new AdvanceSearchModel();

    constructor(location: Location,  private element: ElementRef, private searchService: SearchService,
                private cd: ChangeDetectorRef, private router: Router) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getArea(){
        this.area = new LocationModel();
        this.area.lat = parseFloat(this.advanceSearch.latitude);
        this.area.long = parseFloat(this.advanceSearch.longitude);
        this.area.radius = parseFloat(this.advanceSearch.radius);

        this.searchService.geoSearch = true;
        this.searchService.geoQuery = this.area;

        let startTime = (new Date).getTime();


        Promise.resolve(this.searchService.fetchArea(this.area).then(res =>{
            console.log(res);
            let endTime = (new Date).getTime();
            this.searchService.timeElapsed = endTime - startTime;
        }).catch(err => {
            console.log(err);
        }));
    }

    getNumResults(){
     this.cd.markForCheck();
     return this.searchService.numResults;
    }

    getElapsedTime(){
        this.cd.markForCheck();
        return this.searchService.timeElapsed;
    }

    searchText(){
        if(!isNullOrUndefined(this.queryText) && this.queryText.length > 0){

            this.searchService.geoSearch = false;

            let startTime = (new Date).getTime();

            this.searchService.query = this.queryText;
            this.searchService.blockUserInterface();
            Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
                let endTime = (new Date).getTime();

                this.searchService.timeElapsed = endTime - startTime;

                this.searchService.unBlockUserInterface();
                this.cd.markForCheck();
            });
        }
    }
}
