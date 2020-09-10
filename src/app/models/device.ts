import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Device {
    constructor(
        public name: string,
        public desc: string,
        public ip?: string,
        public batteryLevel?: number,
        public batteryStatus?: string,
        public dev_front?: string[],
        public attr?: Object[]
    ) { }
}

@Injectable({
    providedIn: "root",
})
export class DeviceAdapter implements Adapter<Device> {
    adapt = (item: any): Device => {
        let dev_front: string[] = [];
        let batteryStatus: string;
        if(item.attrNames.includes('dev_front')){
            let index: number = item.attrNames.indexOf('dev_front');
            dev_front = item.attrValues[index];
            item.attrValues.splice(index,1);
        }
        
        if(item.attrNames.includes('battery_status')){
            let index: number = item.attrNames.indexOf('battery_status');
            batteryStatus = item.attrValues[index];   
        }
        
        return new Device(item.name, item.desc, item.ip, item.battery_level,
            batteryStatus, dev_front, item.attrValues);
    }
}