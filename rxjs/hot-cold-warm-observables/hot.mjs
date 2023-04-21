import { multicast, of, defer, Subject } from "rxjs";


// Make hot using multicast() and connect() / .refCount()
// multicast() !!! deprecated
console.log('1--------------------');
let random = () => Math.floor(Math.random() * 100);

let cold = defer(() => of(random()));
let hot = cold.pipe(multicast(new Subject())); // Subject as a proxy between provider and subs

hot.subscribe((x) => console.log("1:", x));
hot.subscribe((x) => console.log("2:", x));

hot.connect();

/*  output:
    1: 83
    2: 83
*/


// Make hot using multicast() .refCount()
// multicast() !!! deprecated
console.log('2--------------------');
let random2 = () => Math.floor(Math.random() * 100);

let cold2 = defer(() => of(random2())); // this is the source(Producer)
let hot2 = cold2.pipe(multicast(new Subject())).refCount(); // with refCount you don't need to use hot.connect(). refCount will count all subs. When we have at least 1 sub we will start to get the values, and right after it will end the the stream, because our source will be executed only once.

hot2.subscribe((x) => console.log("1:", x));
hot2.subscribe((x) => console.log("2:", x));


/*  output:
    1: 18
*/


// Make hot using multicast() .refCount() + Subject factory
// multicast() !!! deprecated
console.log('3--------------------');
let random3 = () => Math.floor(Math.random() * 100);

let cold3 = defer(() => of(random3()));
let hot3 = cold3.pipe(multicast(() => new Subject())).refCount(); // this Subject factory will generate a new Subject for each new sub

hot3.subscribe((x) => console.log("1:", x));
hot3.subscribe((x) => console.log("2:", x));


/*  output:
    1: 63
    2: 20
*/
