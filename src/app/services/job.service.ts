import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { JobsAdapter, Jobs } from '../models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly URL_API = 'http://localhost:1080/job';

  constructor(private http:HttpClient, private jobsAdapter:JobsAdapter) { }

  getJobs = (): Observable<Jobs[]> => {
    let submitter: string;
    submitter = window.navigator.appCodeName + window.navigator.platform;
    return this.http.get(this.URL_API + '/' + submitter)
    .pipe(
      map((data: any)  => {
        return Object.entries(data.message).map( jobsProgress => {  
          return this.jobsAdapter.adapt(jobsProgress);
        });
      }),
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  submitJob = (newJobFile: FormData): Observable<any> => {
    let submitter: string;
    submitter = window.navigator.appCodeName + window.navigator.platform;
    return this.http.post(this.URL_API + '/' + submitter, newJobFile)
    .pipe(map (data => {
      console.log(data);
    }),
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
}