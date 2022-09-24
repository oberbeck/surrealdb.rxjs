import { ObservableInput } from 'rxjs';
import { tapSubscriptionCount } from './tap-subscription-count';

/**
 * Call `onChange` every time the source$ amount of subscriptions changes
 * between 1 and 0.
 */
export function tapHotColdChange<TSource extends ObservableInput<unknown>>(
  onChange: (hasSubscription: boolean) => void
) {
  let alreadyHasSubscription = false;
  return tapSubscriptionCount<TSource>((count) => {
    const hasSubscription = count > 0;
    if (hasSubscription === alreadyHasSubscription) {
      return;
    }
    alreadyHasSubscription = hasSubscription;
    onChange(hasSubscription);
  });
}
