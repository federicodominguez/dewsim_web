import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { JobService } from 'src/app/services/job.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() selectedFile: File;

  error = false;
  errorMessage = '';
  errores: string[];
  schedule: Schedule;

  constructor(private scheduleService:ScheduleService, 
              private jobService: JobService) { 

    this.scheduleService.getSchedulers().subscribe(
      schedule => {
        this.schedule = schedule;
      }, err => {
        this.errores = err.error.errors as string[];
        console.log(err.status);
        console.log(err.error.errors);
      }
    );
  }
  
  ngOnInit() { }

  onFileChange = (event): void => {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit = (): void => {
    let formData = new FormData();
    formData.append('newJobFile', this.selectedFile);
    this.jobService.submitJob(formData)
    .subscribe(
      (data: any) => {
        console.log(data);
      },
      (error => {
        if (error instanceof HttpErrorResponse) {
          this.error = true;
          const err = error.message || JSON.stringify(error.error);
          this.errorMessage = `${error.statusText || ''} Details: ${err}`;
        } else {
        this.error = true;
        this.errorMessage = error;
        }
      }));
  }

}
