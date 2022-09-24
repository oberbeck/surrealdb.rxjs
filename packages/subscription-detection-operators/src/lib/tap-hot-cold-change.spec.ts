import { Subject } from 'rxjs';
import { tapHotColdChange } from './tap-hot-cold-change';

describe('tapHotColdChange', () => {
  test('should reflect active subscriptions change', () => {
    let changeCount = 0;
    let hasSubscription: boolean | undefined;

    const source = new Subject();
    const observable = source.pipe(
      tapHotColdChange((hasSub) => {
        hasSubscription = hasSub;
        changeCount++;
      })
    );
    expect(changeCount).toBe(0);
    expect(hasSubscription).toBe(undefined);

    const sub0 = observable.subscribe();

    expect(changeCount).toBe(1);
    expect(hasSubscription).toBe(true);

    const sub1 = observable.subscribe();

    expect(changeCount).toBe(1);
    expect(hasSubscription).toBe(true);

    sub1.unsubscribe();

    expect(changeCount).toBe(1);
    expect(hasSubscription).toBe(true);

    sub0.unsubscribe();

    expect(changeCount).toBe(2);
    expect(hasSubscription).toBe(false);

    const sub2 = observable.subscribe();

    expect(changeCount).toBe(3);
    expect(hasSubscription).toBe(true);

    sub2.unsubscribe();

    expect(changeCount).toBe(4);
    expect(hasSubscription).toBe(false);
  });
});
