import { Flight } from "./Flight";

export class Subject {
    observers: Observer[] = [];

    constructor() { }

    notify(diff?: FlightDiff): void {
        this.observers.forEach((observer: Observer) => {
            observer.update(diff);
        })
    };

    attach(observer: Observer) {
        this.observers.push(observer);
    };

    detach(observer: Observer): void {
        let index: number = this.observers.indexOf(observer, 0);
        this.observers.splice(index, 1);
    };
}

export interface Observer {
    update(diff?: FlightDiff): void
}

export class StatusChange implements Observer {
    relevant = ['icao24', 'callSign', 'countryOrigin', 'longitude', 'latitude', 'velocity', 'altitude'];
    message: string;

    update(diff: FlightDiff) {
        if (diff) {
            diff.new.forEach((update) => {
                if (update && update.attr && this.relevant.includes(update.attr) && update.val) {
                    this.message += update.attr + ': ' + update.val;
                }
            })
            this.message && console.log(this.message)
        }
    }
}

export class DeltaChange implements Observer {
    relevant = ['longitude', 'latitude', 'velocity', 'altitude'];
    message: string;

    update(diff: FlightDiff) {
        if (diff) {
            diff.old.forEach((update, i) => {
                if (update && update.attr && this.relevant.includes(update.attr) && update.val) {
                    this.message += 'DELTA: ' + update.attr + ': ' + (update.val - diff.new[i].val) + '\n';
                }
            })
            this.message && console.log(this.message)
        }
    }
}

export class FlightDiff {
    new = [];
    old = [];

    constructor(oldFlight: Flight, newFlight: Flight) {
        if (oldFlight && newFlight) {
            let keys = Object.keys(oldFlight);
            let oldVals = Object.values(oldFlight);
            let newVals = Object.values(newFlight);

            oldVals.forEach((val, i) => {
                if (val !== newVals[i]) {
                    this.old.push({ attr: keys[i], val: val });
                    this.new.push({ attr: keys[i], val: newVals[i] });
                }
            })
        }
    }
}
