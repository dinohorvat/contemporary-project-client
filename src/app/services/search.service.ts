import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {ResultDocumentModel} from '../model/ResultDocumentModel';

@Injectable()
export class SearchService {

  numResults = 0;
  query: string;

  resultData: ResultDocumentModel[] = Array();

  constructor(private http: HttpClient) { }

  public searchText(text: string){
    let url = environment.endpoint + "getDocs";
    return this.http.post(url, { query: text}).toPromise().then(result => {
      let res: any = result;
      this.resultData = res.data;
      this.numResults = res.data.length;
      console.log(res);
      return res.data as ResultDocumentModel[];
    }).catch(this.handleError);
  }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
