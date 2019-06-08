import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class <%= entityName.pascal %>Service {

  private entityUrl = 'api/<%= entityName.kebab %>s/';

  constructor(private http: Http) {

  }

  getAll(): Observable<<%= entityName.pascal %>[]> {
    return this.http.get(this.entityUrl)
      .pipe(
        map(this.checkStatus),
        map(response => response.json() as <%= entityName.pascal %>[]),
        catchError(this.handleError)
      );
  }

  getById(id: string): Observable<<%= entityName.pascal %>> {
    return this.http.get(this.entityUrl + id)
      .pipe(
        map(this.checkStatus),
        map(response => response.json() as <%= entityName.pascal %>),
        catchError(this.handleError)
      );
  }

  insert(<%= entityName.camel %>: <%= entityName.pascal %>): Observable<any> {
    return this.http.post(this.entityUrl, <%= entityName.camel %>)
      .pipe(
        map(this.checkStatus),
        catchError(this.handleError)
      );
  }

  update(id: string, <%= entityName.camel %>: <%= entityName.pascal %>) {
    return this.http.put(this.entityUrl + id, <%= entityName.camel %>)
      .pipe(
        map(this.checkStatus),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.entityUrl + id)
      .pipe(
        map(this.checkStatus),
        catchError(this.handleError)
      );
  }

  private checkStatus(response: Response) {
    const status = response.status;
    if (status === 200 || status === 201 || status === 204) {
      return response;
    }
    throw response;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.msg || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    console.log(error);
    return Observable.throw(errMsg);
  }
}
