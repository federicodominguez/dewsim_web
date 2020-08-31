import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DetailService } from 'src/app/services/detail.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  url = 'http://localhost:1080/';
  
  @Input() device: Device;

  @Output() messageEvent = new EventEmitter<boolean>();

  closed: boolean = false;

  constructor(private detailService: DetailService) { }

  ngOnInit() { }

  closeModal = () => {
    this.detailService.closeModal();
    this.messageEvent.emit(true);
  }

  isModal = (): boolean => {
    return this.detailService.modal;
  }

}
