
import { FlightFeed } from './FlightFeed';
import { StatusChange, DeltaChange } from './Observable';

console.log("Starting Flight Monitor");

let feed = new FlightFeed();

let statusChangeObserver = new StatusChange();
let DeltaChangeObserver = new DeltaChange();

feed.attach(statusChangeObserver);
feed.attach(DeltaChangeObserver);

feed.start();
