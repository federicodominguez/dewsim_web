import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  modal: boolean = false;

  constructor() { }

  openModal = (): void => {
    this.modal = true;
  }

  closeModal = (): void => {
    this.modal = false;
  }
}