/*  Hot & Cold Observables
    Tutorial link -> https://www.youtube.com/watch?v=88grqF9ZSjU&ab_channel=AntonBely
*/


import { Subject } from 'rxjs';
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
