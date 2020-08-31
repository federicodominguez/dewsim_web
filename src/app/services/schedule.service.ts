import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Schedule, ScheduleAdapter } from '../models/schedule';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly URL_API = 'http://localhost:1080/getSchedulers';

  constructor(private http:HttpClient, private scheduleAdapter: ScheduleAdapter) { }

  getSchedulers = (): Observable<Schedule> => {
    return this.http.get<Schedule>(this.URL_API)
    .pipe(
      map((data: any) =>  this.scheduleAdapter.adapt(data)
      ),
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
} 