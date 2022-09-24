import { withObservables } from '@surrealdb.rxjs/reactive-surreal-emitter';
import Surreal from 'surrealdb.js';

/**
 * Surreal with Reactive Extensions
 */
export class SurrealRx extends withObservables(Surreal) {
  static #singleton?: SurrealRx;

  /**
   * @note this is *not* the same instance as `Surreal.Instance`
   */
  static override get Instance(): Surreal {
    return this.#singleton
      ? this.#singleton
      : (this.#singleton = new SurrealRx());
  }

  static override get Live() {
    return withObservables(super.Live);
  }
}
