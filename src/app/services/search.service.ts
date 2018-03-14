import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  numResults = 0;
  constructor(private http: HttpClient) { }

  public searchText(text: string){
    let url = environment.endpoint + "getDocs";
    return this.http.post(url, { query: text}).toPromise().then(result => {
      let res: any = result;
      console.log(res);
      return res;
    }).catch(this.handleError);;
  }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
