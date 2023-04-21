import { multicast, of, defer, Subject } from "rxjs";


// Make hot using multicast() and connect()
// multicast() !!! deprecated
let random = () => Math.floor(Math.random() * 100);

let cold = defer(() => of(random()));
let hot = cold.pipe(multicast(new Subject())); // Subject as a proxy between provider and subs

hot.subscribe((x) => console.log("1:", x));
hot.subscribe((x) => console.log("2:", x));

hot.connect(); // creates connection between Subject and Provider. !!! without connect() subs will not get any values

/*  output:
    1: 83
    2: 83
*/
