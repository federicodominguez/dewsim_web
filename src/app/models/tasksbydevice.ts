import { Device } from './device';
import { Task } from './task';

export class TasksByDevice {
        constructor(
                public device?: Device,
                public tasks?: Task[],
        ) { }
}