import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {SearchPageComponent} from './components/main/search-page/search-page.component';
import {FullLayoutComponent} from './components/main/full-layout/full-layout.component';
import {SearchResultsComponent} from './components/main/search-results/search-results.component';




const routes: Routes =[
    { path: '',               redirectTo: 'search', pathMatch: 'full' },
    { path: 'search',      component: SearchPageComponent },
    { path: 'main',   component: FullLayoutComponent, children: [
            {path: '', component: SearchResultsComponent},
    ]},
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
