import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {ResultDocumentModel} from '../model/ResultDocumentModel';
import {isNullOrUndefined} from 'util';

declare var google;

@Injectable()
export class SearchService {

    numResults = 0;
    query: string = "";
    blockUI: boolean = false;
    resultData: ResultDocumentModel[] = Array();
    timeElapsed: number = 0;

    // G-MAP
    overlays: any[] = new Array();

    constructor(private http: HttpClient) {
    }

    public searchText(text: string) {
        let url = environment.endpoint + 'getDocs';
        return this.http.post(url, {query: text}).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.numResults = res.results;
            console.log(res);
            this.setMapMarkers(res.data);
            return res.data as ResultDocumentModel[];
        }).catch(this.handleError);
    }

    public fetchPage(pageNum: number, text: string){
        let url = environment.endpoint + 'getDocs/' + pageNum;
        return this.http.post(url, {query: text}).toPromise().then(result => {
            let res: any = result;
            this.resultData = res.data;
            this.setMapMarkers(res.data);
            return res;
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

    updateDocument(document) {
        let url = environment.endpoint + 'updateDocument';
        return this.http.put(url,document).toPromise().then(result => {
            let res: any = result;
            alert(res.message);
            console.log(res);
            return 200;
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

    public setMapMarkers(dataPoints: any[]){
        this.overlays = new Array();

        for(let idx=0; idx<dataPoints.length; idx++){
            this.overlays.push(new google.maps.Marker({position: {lat: dataPoints[idx].latitude,
                    lng: dataPoints[idx].longitude}, title:dataPoints[idx].attacktype1_txt, eventId: dataPoints[idx].eventid}))
        }
    }
}
