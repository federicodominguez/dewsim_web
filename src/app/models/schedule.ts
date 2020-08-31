import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Schedule {
    public constructor(
        public name?:string,
        public description?:string
    ) {}
}


@Injectable({
    providedIn: "root",
})
export class ScheduleAdapter implements Adapter<Schedule> {
    adapt = (item: any): Schedule => {
        return new Schedule(item.name, item.desc);
    }
}