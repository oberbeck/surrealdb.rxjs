import { defer, finalize, ObservableInput } from 'rxjs';

/**
 * Call `onCountUpdate` every time the amount of subscriptions on source$
 * changes.
 */
export function tapSubscriptionCount<TSource extends ObservableInput<unknown>>(
  onCountUpdate: (c: number) => void
) {
  return function refCountOperatorFunction(source$: TSource) {
    let counter = 0;

    return defer(() => {
      counter++;
      onCountUpdate(counter);
      return source$;
    }).pipe(
      finalize(() => {
        counter--;
        onCountUpdate(counter);
      })
    );
  };
}
