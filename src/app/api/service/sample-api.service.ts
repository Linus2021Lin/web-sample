import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SampleDataListResponse,
  SampleDataResponse,
  SampleDataPostSchema,
  SampleDataPutSchema,
  SampleDataDeleteSchema
} from '../interface/sample-resource';

@Injectable({
  providedIn: 'root'
})
export class SampleApiService {

  constructor(
    private http: HttpClient
  ){ }

  public getSample(): Observable<SampleDataListResponse> {
    return this.http.get<SampleDataListResponse>(`${environment.apiUrl}/api/sample`);
  }

  public getSampleById(id: number): Observable<SampleDataResponse> {
    return this.http.get<SampleDataResponse>(`${environment.apiUrl}/api/sample/${id}`);
  }

  public postSample(params: SampleDataPostSchema) {
    return this.http.post(`${environment.apiUrl}/api/sample`, params);
  }

  public putSample(id: number, params: SampleDataPutSchema) {
    return this.http.put(`${environment.apiUrl}/api/sample/${id}`, params);
  }

  public deleteSample(params: SampleDataDeleteSchema) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: params,
    };
    return this.http.delete(`${environment.apiUrl}/api/samplen`, options);
  }
}
