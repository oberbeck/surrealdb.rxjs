import { tapHotColdChange } from '@surrealdb.rxjs/subscription-detection-operators';
import { Observable, Subject, take } from 'rxjs';
import { Emitter, EventMap, EventName, EventArguments } from './emitter';

type Constructor<T = {}> = new (...args: any[]) => T;

export function withObservables<
  TBase extends Constructor<Emitter<TEventMap>>,
  TEventMap extends EventMap
>(Base: TBase) {
  return class extends Base {
    #events: {
      [TEventName in EventName<TEventMap>]?: {
        subject: Subject<EventArguments<TEventName, TEventMap>>;
        observable: Observable<EventArguments<TEventName, TEventMap>>;
      };
    } = {};

    /**
     * Adds an event listener for `e` when subscribed. Multiple subscriptions
     * share the same event listener internaly. When all subscriptions are
     * unsubscribed the event listener is removed.
     * @returns an `Observable` emitting everytime an event is emitted for `e`.
     */
    on$<TEventName extends EventName<TEventMap>>(e: TEventName) {
      if (!this.#events[e]) {
        const subject = new Subject<EventArguments<TEventName, TEventMap>>();
        const observable = subject.pipe(
          tapHotColdChange((hasSubscription) => {
            const listener = (
              ...args: EventArguments<TEventName, TEventMap>
            ) => {
              subject.next(args);
            };
            if (hasSubscription) {
              this.on(e, listener);
            } else {
              this.off(e, listener);
            }
          })
        );
        this.#events[e] = {
          subject,
          observable,
        };
      }

      return this.#events[e]!.observable;
    }

    /**
     * Adds an event listener for `e` when subscribed. After the first emit, the
     * subscription completes. Multiple subscriptions will share the same event
     * listener internaly. When all subscriptions are unsubscribed or the first
     * emit occured, the event listener is removed.
     * @returns an `Observable` emitting one event the first an event is
     * emitted for `e`.
     */
    once$<TEventName extends EventName<TEventMap>>(e: TEventName) {
      return this.on$(e).pipe(take(1));
    }
  };
}
