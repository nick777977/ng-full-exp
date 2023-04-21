import { interval } from 'rxjs';
import { take, publish, refCount } from 'rxjs/operators';

let obs = interval(1000).pipe(
  take(3),
  publish(),
  refCount()
);

setTimeout(() => {
  console.log('1')
  obs.subscribe(data => console.log('sub1', data));
}, 1100)

setTimeout(() => {
  console.log('2')
  obs.subscribe(data => console.log('sub2', data));
}, 3100)

/*  output:
    1
    sub1 0
    2
    sub1 1
    sub2 1
    sub1 2
    sub2 2
*/
