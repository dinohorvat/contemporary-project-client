import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {ResultDocumentModel} from '../model/ResultDocumentModel';

@Injectable()
export class SearchService {

    numResults = 0;
    query: string;
    blockUI: boolean = false;
    resultData: ResultDocumentModel[] = Array();

    constructor(private http: HttpClient) {
    }

    public searchText(text: string) {
        let url = environment.endpoint + 'getDocs';
        return this.http.post(url, {query: text}).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.numResults = res.results;
            console.log(res);
            return res.data as ResultDocumentModel[];
        }).catch(this.handleError);
    }

    public fetchPage(pageNum: number, text: string){
        let url = environment.endpoint + 'getDocs/' + pageNum;
        this.http.post(url, {query: text}).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
        }).catch(this.handleError);
    }

    fetchDocument(eventid) {
        let url = environment.endpoint + 'getDocument/' + eventid;
        return this.http.get(url).toPromise().then(result => {
            let res: any = result;
            let document = res.data[0];
            return document as ResultDocumentModel;
        }).catch(this.handleError);
    }

    blockUserInterface(): void {
        this.blockUI = true;
    }

    unBlockUserInterface(): void {
        this.blockUI = false;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
