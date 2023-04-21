import { multicast, of, defer, Subject } from "rxjs";


// Make hot using multicast() and connect() / .refCount()
// multicast() !!! deprecated
let random = () => Math.floor(Math.random() * 100);

let cold = defer(() => of(random()));
let hot = cold.pipe(multicast(new Subject())); // Subject as a proxy between provider and subs

hot.subscribe((x) => console.log("1:", x));
hot.subscribe((x) => console.log("2:", x));

//hot.connect(); // creates connection between Subject and Provider. !!! without connect() subs will not get any values

/*  output:
    1: 83
    2: 83
*/


// Make hot using multicast() .refCount()
// multicast() !!! deprecated
let random2 = () => Math.floor(Math.random() * 100);

let cold2 = defer(() => of(random())); // this is the source(Producer)
let hot2 = cold2.pipe(multicast(new Subject())).refCount(); // with refCount you don't need to use hot.connect(). refCount will count all subs. When we have at least 1 sub we will start to get the values, and right after it will end the the stream, because our source will be executed only once.

hot2.subscribe((x) => console.log("1:", x));
hot2.subscribe((x) => console.log("2:", x));


/*  output:
    1: 18
*/
