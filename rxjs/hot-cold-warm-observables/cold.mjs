/*  Hot & Cold Observables
    Tutorial link -> https://www.youtube.com/watch?v=88grqF9ZSjU&ab_channel=AntonBely
*/


import { ReplaySubject, Subject } from 'rxjs';

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


/* output:
    first next: 85
    first next: 77
    first complete
    second next: 77
    second complete
 */
