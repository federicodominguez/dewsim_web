import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { MatTableDataSource } from '@angular/material';
import { Job } from 'src/app/models/job';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;
  jobs: Job[] = new Array;
  displayedColumns: string[] = ['jobId', 'submission_time', "execution_start", 'execution_finished', 'execution_status'];
  dataSource: MatTableDataSource<Job>;

  progress: number;

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private detailService: DetailService) {  }

  ngOnInit() { }

  ngOnChanges() {
    this.jobs = this.task.jobs;
    this.progress = this.getTaskProgress();
    this.dataSource = new MatTableDataSource<Job>(this.jobs);
    this.jobs = [];
  }

  closeModal = (): void => {
    this.detailService.closeModal();
    this.messageEvent.emit(true);
  }

  isModal = (): boolean => {
    return this.detailService.modal;    
  }

  getTaskProgress = (): number => {
    let finishedJobs: number;
    finishedJobs = 0;
    this.task.jobs.forEach(job => {
      if(job.execution_status === 'ok'){
        finishedJobs++;
      }
    });
    let progress: number;
    progress = (finishedJobs / this.task.jobs.length) * 100;
    return Number(progress.toFixed());
  }

}
