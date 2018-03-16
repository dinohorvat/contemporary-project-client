import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {SearchService} from '../../services/search.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  queryText: string;

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

    searchText(){
        if(!isNullOrUndefined(this.queryText) && this.queryText.length > 0){
            console.log("tu tu tu 2");
            this.searchService.query = this.queryText;
            this.searchService.blockUserInterface();
            Promise.resolve(this.searchService.searchText(this.searchService.query)).then(result => {
                this.searchService.unBlockUserInterface();
                this.cd.markForCheck();
            });
        }
    }
}
