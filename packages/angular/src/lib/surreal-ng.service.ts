import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { SurrealRx } from '@surrealdb.rxjs/reactive';

export const SURREAL_URL = new InjectionToken<string>('SURREAL_URL');
export const SURREAL_TOKEN = new InjectionToken<string>('SURREAL_TOKEN');

/**
 * Surreal for Angular
 */
@Injectable({ providedIn: 'root' })
export class SurrealNg extends SurrealRx {
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
