import { Subject } from 'rxjs';
import { tapSubscriptionCount } from './tap-subscription-count';

describe('tapSubscriptionCount', () => {
  test('should reflect active subscription count', () => {
    let subscriptionCount = 0;
    const source = new Subject();
    const observable = source.pipe(
      tapSubscriptionCount((c) => {
        subscriptionCount = c;
      })
    );

    const sub0 = observable.subscribe();
    const sub1 = observable.subscribe();
    const sub2 = observable.subscribe();

    expect(subscriptionCount).toBe(3);
    sub1.unsubscribe();
    expect(subscriptionCount).toBe(2);
    sub2.unsubscribe();
    expect(subscriptionCount).toBe(1);
    const sub3 = observable.subscribe();
    expect(subscriptionCount).toBe(2);
    sub0.unsubscribe();
    expect(subscriptionCount).toBe(1);
    sub3.unsubscribe();
    expect(subscriptionCount).toBe(0);
  });
});
