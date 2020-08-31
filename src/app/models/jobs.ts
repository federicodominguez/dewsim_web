import { Job } from './job';
import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Jobs {
    constructor(
        public device_id?: string,
        public jobs?: Job[],
    ) { }
}

@Injectable({
    providedIn: "root",
})
export class JobsAdapter implements Adapter<Jobs> {
    adapt = (item: any): Jobs => {
        let jobs: Job[] = new Array;
        Object.values(item[1]).map(entry => {
            Object.values(entry).map(job => {
                let jobAdapter = Object.assign(new Job(), job);
                jobs.push(jobAdapter);
            });
        });
        return new Jobs(item[0], jobs);
    }
}