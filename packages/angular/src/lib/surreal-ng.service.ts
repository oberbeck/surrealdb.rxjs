import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { withObservables } from '@surrealdb.rxjs/reactive-surreal-emitter';
import Surreal from 'surrealdb.js';

export const SURREAL_URL = new InjectionToken<string>('SURREAL_URL');
export const SURREAL_TOKEN = new InjectionToken<string>('SURREAL_TOKEN');

/**
 * Surreal for Angular
 */
@Injectable({ providedIn: 'root' })
export class SurrealNg extends withObservables(Surreal) {
  constructor(
    @Optional()
    @Inject(SURREAL_URL)
    url?: string,
    @Optional()
    @Inject(SURREAL_TOKEN)
    token?: string
  ) {
    super(url, token);
  }
}
