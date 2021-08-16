import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SERVER_URL} from '../util/url.domain';
import * as moment from 'moment';

@Injectable()
export class CrudService {
    protected customHeaders(httpHeaders: HttpHeaders): void {
    }

    protected getHeadersDeleteAny(idsToDelete: number[]): any {
        const user = JSON.parse(localStorage.getItem('user'));
        const _httpOptions: _customHttpHeader = new _customHttpHeader();
        _httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json'});
        if (user) {
            _httpOptions.headers.set('Authorization', user.token);
        }
        _httpOptions.body = idsToDelete;
        return _httpOptions;
    }

    getParams(): HttpParams {
        let httpParams: HttpParams = new HttpParams();
        httpParams = httpParams.set('time', moment().unix().toString());
        return httpParams;
    }

    protected getHeaders(): HttpHeaders {
        let httpHeaders: HttpHeaders = new HttpHeaders();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            httpHeaders.set('Authorization', user.token);
        }

        this.customHeaders(httpHeaders);
        httpHeaders.set('Content-Type', 'application/json');
        return httpHeaders;
    }

    constructor(
        public  http: HttpClient
    ) {
    }

    insert(url: string, item): Observable<Object> {
        // const options = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json'
        //     }),
        //     body: { ...item }
        // } 
    
        // return this.http.post(_URL, options);
        console.log(item);
        return this.http.post(SERVER_URL + url, item, {
            headers: this.getHeaders()
        });
    }

    update(url: string, id: any, item: Object): Observable<Object> {
        return this.http.put(SERVER_URL + url + '/' + id, item, {
            headers: this.getHeaders()
        });
    }

    updatePartial(url: string, id: number, item: Object): Observable<Object> {
        return this.http.patch(SERVER_URL + url + '/' + id, item, {
            headers: this.getHeaders()
        });
    }

    remove(url: string, id: number): Observable<any> {
        return this.http.delete(SERVER_URL + url + '/' + id, {headers: this.getHeaders()});
    }

    getOne(url, id) {
        return this.http.get(SERVER_URL + url + '/' + id);
    }

    removeAny(url: string, ids: any[]): Observable<any> {
        return this.http.delete(SERVER_URL + url, {headers: this.getHeadersDeleteAny(ids)});
    }

    getAll(url): any { // , fields, page, size, search?, orderColumn?, orderMethod?
        // let ordernacao: string = orderColumn ?? '';
        let httpParams = new HttpParams();
        // httpParams = httpParams.set('fields', fields);
        // httpParams = httpParams.set('page', page);
        // httpParams = httpParams.set('count', 'true');
        // httpParams = httpParams.set('limit', size);

        // if (search) {
        //     httpParams = httpParams.set('search', search);
        // }

        // if (ordernacao !== '' && orderMethod && orderMethod !== '') {
        //     ordernacao += ':' + orderMethod;
        //     httpParams = httpParams.set('order', ordernacao);
        // }
        return this.http.get(SERVER_URL + url, {
            headers: this.getHeaders(),
            params: httpParams
        });
    }

}


export class _customHttpHeader {
    headers: HttpHeaders;
    body?: any;
}