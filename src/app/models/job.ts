export class Job {
    constructor(
        public job_id?: string,
        public task_id?: string,
        public submission_time?: string,
        public execution_start?: string,
        public execution_finished?: string,
        public execution_status?: string,
    ) {}
}