import { Injectable } from '@angular/core';
import { Device, DeviceAdapter } from '../models/device';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private readonly URL_API = 'http://localhost:1080/devices/all';

  constructor(private http:HttpClient, private adapter: DeviceAdapter) { }

  getDevices = (): Observable<Device[]> => {
    return this.http.get<Device[]>(this.URL_API)
    .pipe(
      map((data: any) => data.info.map((item) => this.adapter.adapt(item))
    ),
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
}
