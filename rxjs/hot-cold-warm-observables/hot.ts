import { ConnectableObservable, multicast, of, defer, Subject, publish, share, Observable, refCount } from "rxjs";

// !!! run tsc hot.ts -> change hot.js to .cjs -> run in nodejs

// START
/*  Hot & Cold Observables
    Video name -> Angular - RxJS 6 - Hot & Cold - RS School
    Tutorial link -> https://www.youtube.com/watch?v=88grqF9ZSjU&ab_channel=AntonBely
*/


// Make hot using multicast() and connect()
// multicast() !!! deprecated
console.log('1--------------------');
let random = () => Math.floor(Math.random() * 100);

let cold = defer(() => of(random()));
let hot = cold.pipe(multicast(new Subject())); // Subject as a proxy between provider and subs

hot.subscribe((x) => console.log("1:", x));
hot.subscribe((x) => console.log("2:", x));

(hot as ConnectableObservable<number>).connect();

/*  output:
    1: 83
    2: 83
*/


// Make hot using multicast() .refCount()
// multicast() !!! deprecated
console.log('2--------------------');
let random2 = () => Math.floor(Math.random() * 100);

let cold2 = defer(() => of(random2())); // this is the source(Producer)
let hot2 = cold2.pipe(multicast(new Subject()), refCount());
// with refCount you don't need to use hot.connect().
// refCount will count all subs. When we have at least 1 sub we will start to get the values, and right after it will end the the stream.
// because our source will be executed only once.

hot2.subscribe((x) => console.log("1:", x));
hot2.subscribe((x) => console.log("2:", x));


/*  output:
    1: 18
*/


// Make hot using multicast() .refCount() + Subject factory
// multicast() !!! deprecated
console.log('3--------------------');
let random3 = () => Math.floor(Math.random() * 100);

let cold3: Observable<number> = defer(() => of(random3()));
let hot3 = cold3.pipe(multicast(() => new Subject()), refCount()); // this Subject factory will generate a new Subject for each new sub

hot3.subscribe((x) => console.log("1:", x));
hot3.subscribe((x) => console.log("2:", x));


/*  output:
    1: 63
    2: 20
*/


// Make hot using publish() and connect()
// publish() !!! deprecated
// .multicast(new Subject()) === publish()
console.log('4--------------------');
let random4 = () => Math.floor(Math.random() * 100);

let cold4 = defer(() => of(random4()));
let hot4 = cold4.pipe(publish());

hot4.subscribe((x) => console.log("1:", x));
hot4.subscribe((x) => console.log("2:", x));

(hot4 as ConnectableObservable<number>).connect();

/*  output:
    1: 83
    2: 83
*/



// Make hot using share()
// .multicast(() => new Subject())).refCount() === share()
console.log('5--------------------');
let random5 = () => Math.floor(Math.random() * 100);

let cold5 = defer(() => of(random5()));
let hot5 = cold5.pipe(share());

hot5.subscribe((x) => console.log("1:", x));
hot5.subscribe((x) => console.log("2:", x));


/*  output:
    1: 63
    2: 20
*/

// END
/*  Hot & Cold Observables
    Video name -> Angular - RxJS 6 - Hot & Cold - RS School
    Tutorial link -> https://www.youtube.com/watch?v=88grqF9ZSjU&ab_channel=AntonBely
*/

// START
/*  Hot & Cold Observables
    Video name -> Hot vs Cold Observable in RxJs (2021)
    Tutorial link -> https://www.youtube.com/watch?v=oKqcL-iMITY&ab_channel=DecodedFrontend
*/

// custom operator
console.log('custom operator')
// cold
const fromTimestamp = (): Observable<number> => {
  return new Observable( (subscriber) => {
    const timestamp = Date.now()
    subscriber.next(timestamp);
  } )
}

const obs$ = fromTimestamp();
obs$.subscribe({
  next: (value) => console.log('1->', value)
})

setTimeout(() => {
  obs$.subscribe({
    next: (value) => console.log('2->', value)
  })
}, 2000)

/*  output:
    1-> 1682109177079
    2-> 1682109179093
 */

// hot
const fromTimestamp2 = (): Observable<number> => {
  const timestamp = Date.now()
  return new Observable( (subscriber) => {
    subscriber.next(timestamp);
  } )
}

const obs2$ = fromTimestamp2();
obs2$.subscribe({
  next: (value) => console.log('1->', value)
})

setTimeout(() => {
  obs2$.subscribe({
    next: (value) => console.log('2->', value)
  })
}, 2000)

// from above exactly the same as below (syntax sugar)
// setTimeout(() => {
//   obs2$.subscribe(console.log)
// }, 2000)

/*  output:
    1-> 1682109177079
    2-> 1682109177079
 */

// END
/*  Hot & Cold Observables
    Video name -> Hot vs Cold Observable in RxJs (2021)
    Tutorial link -> https://www.youtube.com/watch?v=oKqcL-iMITY&ab_channel=DecodedFrontend
*/

