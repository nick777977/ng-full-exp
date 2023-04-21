"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
// START
/*  Hot & Cold Observables
    Video name -> Angular - RxJS 6 - Hot & Cold - RS School
    Tutorial link -> https://www.youtube.com/watch?v=88grqF9ZSjU&ab_channel=AntonBely
*/
// Make hot using multicast() and connect()
// multicast() !!! deprecated
console.log('1--------------------');
var random = function () { return Math.floor(Math.random() * 100); };
var cold = (0, rxjs_1.defer)(function () { return (0, rxjs_1.of)(random()); });
var hot = cold.pipe((0, rxjs_1.multicast)(new rxjs_1.Subject())); // Subject as a proxy between provider and subs
hot.subscribe(function (x) { return console.log("1:", x); });
hot.subscribe(function (x) { return console.log("2:", x); });
hot.connect();
/*  output:
    1: 83
    2: 83
*/
// Make hot using multicast() .refCount()
// multicast() !!! deprecated
console.log('2--------------------');
var random2 = function () { return Math.floor(Math.random() * 100); };
var cold2 = (0, rxjs_1.defer)(function () { return (0, rxjs_1.of)(random2()); }); // this is the source(Producer)
var hot2 = cold2.pipe((0, rxjs_1.multicast)(new rxjs_1.Subject()), (0, rxjs_1.refCount)());
// with refCount you don't need to use hot.connect().
// refCount will count all subs. When we have at least 1 sub we will start to get the values, and right after it will end the the stream.
// because our source will be executed only once.
hot2.subscribe(function (x) { return console.log("1:", x); });
hot2.subscribe(function (x) { return console.log("2:", x); });
/*  output:
    1: 18
*/
// Make hot using multicast() .refCount() + Subject factory
// multicast() !!! deprecated
console.log('3--------------------');
var random3 = function () { return Math.floor(Math.random() * 100); };
var cold3 = (0, rxjs_1.defer)(function () { return (0, rxjs_1.of)(random3()); });
var hot3 = cold3.pipe((0, rxjs_1.multicast)(function () { return new rxjs_1.Subject(); }), (0, rxjs_1.refCount)()); // this Subject factory will generate a new Subject for each new sub
hot3.subscribe(function (x) { return console.log("1:", x); });
hot3.subscribe(function (x) { return console.log("2:", x); });
/*  output:
    1: 63
    2: 20
*/
// Make hot using publish() and connect()
// publish() !!! deprecated
// .multicast(new Subject()) === publish()
console.log('4--------------------');
var random4 = function () { return Math.floor(Math.random() * 100); };
var cold4 = (0, rxjs_1.defer)(function () { return (0, rxjs_1.of)(random4()); });
var hot4 = cold4.pipe((0, rxjs_1.publish)());
hot4.subscribe(function (x) { return console.log("1:", x); });
hot4.subscribe(function (x) { return console.log("2:", x); });
hot4.connect();
/*  output:
    1: 83
    2: 83
*/
// Make hot using share()
// .multicast(() => new Subject())).refCount() === share()
console.log('5--------------------');
var random5 = function () { return Math.floor(Math.random() * 100); };
var cold5 = (0, rxjs_1.defer)(function () { return (0, rxjs_1.of)(random5()); });
var hot5 = cold5.pipe((0, rxjs_1.share)());
hot5.subscribe(function (x) { return console.log("1:", x); });
hot5.subscribe(function (x) { return console.log("2:", x); });
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
console.log('custom operator');
// cold
var fromTimestamp = function () {
    return new rxjs_1.Observable(function (subscriber) {
        var timestamp = Date.now();
        subscriber.next(timestamp);
    });
};
var obs$ = fromTimestamp();
obs$.subscribe({
    next: function (value) { return console.log('1->', value); }
});
setTimeout(function () {
    obs$.subscribe({
        next: function (value) { return console.log('2->', value); }
    });
}, 2000);
/*  output:
    1-> 1682109177079
    2-> 1682109179093
 */
// hot
var fromTimestamp2 = function () {
    var timestamp = Date.now();
    return new rxjs_1.Observable(function (subscriber) {
        subscriber.next(timestamp);
    });
};
var obs2$ = fromTimestamp2();
obs2$.subscribe({
    next: function (value) { return console.log('1->', value); }
});
// setTimeout(() => {
//   obs2$.subscribe({
//     next: (value) => console.log('2->', value)
//   })
// }, 2000)
setTimeout(function () {
    obs2$.subscribe(console.log);
}, 2000);
/*  output:
    1-> 1682109177079
    2-> 1682109177079
 */
