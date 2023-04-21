/*  Hot & Cold Observables
    Tutorial link -> https://www.youtube.com/watch?v=88grqF9ZSjU&ab_channel=AntonBely
*/


import { ReplaySubject, Subject, BehaviorSubject, AsyncSubject } from 'rxjs';

// regular Subject

let subj = new Subject();
subj.subscribe(
  (val) => console.log('first next:', val),
  (err) => console.log('first was error:', err),
  () => console.log('first complete')
);
subj.next('Yes, I can');
subj.complete();
subj.subscribe(
  (val) => console.log('second next:', val),
  (err) => console.log('second was error:', err),
  () => console.log('second complete')
);

/* output:
    first next: Yes, I can
    first complete
    second complete
 */

// ReplaySubject
// ReplaySubject will repeat the last emitted value to all new subscribers
// ReplaySubject constructor can specify the number of last emitted values to repeat (buffer size). !!! default buffer size to infinite

let replaySubj = new ReplaySubject(1);
replaySubj.subscribe(
  val => console.log('first next:', val),
  err => console.log('first was error:', err),
  () => console.log('first complete')
);

replaySubj.next( Math.floor((Math.random() * 100)) );
replaySubj.next( Math.floor((Math.random() * 100)) );
replaySubj.complete();

replaySubj.subscribe(
  val => console.log('second next:', val),
  err => console.log('second was error:', err),
  () => console.log('second complete')
);


/*  output:
    first next: 85
    first next: 77
    first complete
    second next: 77
    second complete
 */


// BehaviorSubject
// BehaviorSubject constructor can receive the initial value for stream. Before any .next() first subscribers will see this initial value
// Before complete all new subscribers will receive the last emitted value.
// After .complete() no values will be emitted to new subs

let behaviorSubj = new BehaviorSubject('initial value');
behaviorSubj.subscribe(
  val => console.log('first next:', val),
  err => console.log('first was error:', err),
  () => console.log('first complete')
);

behaviorSubj.next( Math.floor((Math.random() * 100)) );

behaviorSubj.subscribe(
  val => console.log('second next:', val),
  err => console.log('second was error:', err),
  () => console.log('second complete')
);

behaviorSubj.complete();

behaviorSubj.subscribe(
  val => console.log('third next:', val),
  err => console.log('third was error:', err),
  () => console.log('third complete')
);


/*  output:
    first next: initial value
    first next: 30
    second next: 30
    first complete
    second complete
    third complete
*/



