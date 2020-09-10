import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { JobService } from 'src/app/services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Job } from 'src/app/models/job';
import { DetailService } from 'src/app/services/detail.service';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';
import { Jobs } from 'src/app/models/jobs';
import { forkJoin, Observable, Subscription, timer } from 'rxjs';
import { TasksByDevice } from 'src/app/models/tasksbydevice';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  displayedColumns: string[] = ['device', 'tasks'];
  dataSource: MatTableDataSource<TasksByDevice>;
  error = false;
  errorMessage = '';

  devices: Device[];
  jobs: Jobs[];
  selectedTask: Task;
  selectedDevice: Device;

  tasksByDevice: TasksByDevice[];

  private timerSubscription: Subscription;
  private deviceAndJobsSubscription: Subscription;

  url = 'http://localhost:1080/';

  public slide = [
    {
      src: "/assets/image.png"
    }
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private jobsService: JobService,
    private deviceService: DeviceService,
    private detailService: DetailService) {

  }

  ngOnInit() {
    this.error = false;
    this.errorMessage = '';

    this.refreshData();
  }

  private getTasksByDevice = (jobs: Jobs[], devices: Device[]) => {
    let tasksByDeviceArray: TasksByDevice[];
    tasksByDeviceArray = [];
    for (let jobDevice of jobs) {
      for (let device of devices) {
        if (device.name === jobDevice.device_id) {
          let tasks: Task[] = this.getTasks(jobDevice.jobs);
          device.batteryStatus = this.getIconBatteryStatus(device);
          let tasksByDevice: TasksByDevice = new TasksByDevice(device, tasks);
          tasksByDeviceArray.push(tasksByDevice);
        }
      }
    }
    return tasksByDeviceArray;
  }

  getIconBatteryStatus = (device: Device): string => {
    switch (device.batteryStatus) {
      case 'charging_usb': {
        return 'usb';
      }
      case 'charging_ac': {
        return 'power';
      }
      case 'discharging':
        return 'battery_full';
    }
  }

  private getTasks = (jobs: Job[]): Task[] => {
    let tasks: Task[] = [];
    for (let job of jobs) {
      let taskId = job.task_id;
      let task: Task;
      task = tasks.find(task => task.taskId === taskId);
      if (task) {
        let jobs: Job[] = task.jobs;
        jobs.push(job);
        task.jobs = jobs;
      } else {
        let jobs: Job[] = [];
        jobs.push(job);
        task = new Task(taskId, jobs);
        tasks.push(task);
      }
    }

    tasks.forEach(task => {
      task.color = this.styleObject(task);
    });

    return tasks;
  }

  closeModal($event) {
    let closed: Boolean = $event;
    if (closed) {
      this.selectedDevice = null;
      this.selectedTask = null;
    }
  }

  openTaskModal = (task: Task): void => {
    this.selectedTask = task;
    this.detailService.openModal();
  }

  openDeviceModal = (device: Device) => {
    this.selectedDevice = device;
    this.detailService.openModal();
  }

  styleObject = (task: Task): Object => {
    let queued, running, failed, ok: number;
    queued = 0;
    running = 0;
    failed = 0;
    ok = 0;
    let jobs: Job[] = task.jobs;
    for (let job of jobs) {
      switch (job.execution_status) {
        case 'queued': {
          queued++;
          break;
        }
        case 'running': {
          running++;
          break;
        }
        case 'failed': {
          failed++;
          break;
        }
        case 'ok': {
          ok++;
          break;
        }
      }
    }

    if (failed > 0) {
      return { color: 'red' };
    }

    if (queued === jobs.length) {
      return { color: 'blue' };
    }

    if (ok === jobs.length) {
      return { color: 'green' };
    }

    if ((running > 0) && (failed === 0)) {
      return { color: 'yellow' };
    }

    if ((running === 0) && (queued > 0) && (failed === 0)) {
      return { color: 'primary' };
    }

    return { color: 'primary' };
  }

  setImage = (device: Device): string => {
    if (device.dev_front.length > 0) {
      return this.url + device.dev_front[0];
    }
    return this.slide[0].src;
  }

  private refreshData(): void {
    this.deviceAndJobsSubscription = forkJoin([this.jobsService.getJobs(), this.deviceService.getDevices()]).subscribe(result => {
      this.jobs = result[0];
      this.devices = result[1];
      this.tasksByDevice = this.getTasksByDevice(this.jobs, this.devices);
      this.dataSource = new MatTableDataSource<TasksByDevice>(this.tasksByDevice);
      this.dataSource.paginator = this.paginator;
      this.subscribeToData();
    }, (error => {
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

  private subscribeToData(): void {
    this.timerSubscription = timer(5000).subscribe(() => this.refreshData()); 
  }
}
