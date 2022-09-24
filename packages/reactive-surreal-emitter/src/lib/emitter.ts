export type EventMap = {
  [TEventName in string]: unknown[];
};

export type EventName<TEmitter> = keyof TEmitter;

export type EventArguments<
  TEventName extends keyof TEmitter,
  TEmitter
> = TEmitter[TEventName];

export interface Emitter<TEventMap extends EventMap> {
  on<TEventName extends EventName<TEventMap>>(
    e: TEventName,
    listener: (...args: EventArguments<TEventName, TEventMap>) => void
  ): void;
  off<TEventName extends EventName<TEventMap>>(
    e: TEventName,
    listener: (...args: EventArguments<TEventName, TEventMap>) => void
  ): void;
}
