import {ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {SearchService} from '../../../services/search.service';

declare const $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit,DoCheck {


  constructor(public searchService:SearchService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngDoCheck() {
        this.ref.detectChanges();
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
