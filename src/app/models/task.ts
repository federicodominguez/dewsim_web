import { Job } from './job';

export class Task {
    constructor(
        public taskId: string,
        public jobs: Job[],
        public color?: Object
    ) {}
}