import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchPageComponent } from './main/search-page/search-page.component';
import {FullLayoutComponent} from './main/full-layout/full-layout.component';
import { SearchResultsComponent } from './main/search-results/search-results.component';
import { SearchDataComponent } from './main/search-data/search-data.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SearchPageComponent,
    FullLayoutComponent,
    SearchResultsComponent,
    SearchDataComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
