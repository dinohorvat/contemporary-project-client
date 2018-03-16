import {Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from "util";

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
    queryText: string;

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

    getNumResults(){
     this.cd.markForCheck();
     return this.searchService.numResults;
    }

    searchText(){

        if(!isNullOrUndefined(this.queryText) && this.queryText.length > 0){
            console.log("tu tu tu");
            this.searchService.query = this.queryText;
            this.searchService.blockUserInterface();
            Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
                this.searchService.unBlockUserInterface();
                this.cd.markForCheck();
            });
        }
    }
}
