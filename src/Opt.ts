import { Lazy } from "./Lazy"

/*
  Opt - a value may or may not be present (Some or None)
*/
export abstract class Opt<T> {
  protected constructor(readonly isEmpty: boolean) {}
  readonly isDefined: boolean = !this.isEmpty

  abstract getOrElse(alternative: Lazy<T>): T
  abstract getOrNull(): T | null
  abstract orElse(alternative: Lazy<Opt<T>>): Opt<T>
  abstract get(): T
  abstract map<U>(f: (t: T) => U): Opt<U>
  abstract flatMap<U>(f: (t: T) => Opt<U>): Opt<U>
  abstract filter(f: (t: T) => boolean): Opt<T>
  abstract toString(): string
}

/*
  Some - a value is present
*/
export class Some<T> extends Opt<T> {
  static of<T>(value: T) {
    return new Some(value)
  }

  private constructor(private value: T) {
    super(false)
  }

  getOrElse(alternative: Lazy<T>): T {
    return this.value
  }

  getOrNull(): T | null {
    return this.value
  }

  orElse(alternative: Lazy<Opt<T>>): Opt<T> {
    return this
  }

  get(): T {
    return this.value
  }

  map<U>(f: (t: T) => U): Opt<U> {
    return Some.of(f(this.value))
  }

  flatMap<U>(f: (t: T) => Opt<U>): Opt<U> {
    return f(this.value)
  }

  filter(f: (t: T) => boolean): Opt<T> {
    return f(this.value) ? this : None.of()
  }

  toString(): string {
    return `Some(${JSON.stringify(this.value)})`
  }
}

/*
  None - a value is not present
*/
export class None<T> extends Opt<T> {
  static of<T>() {
    return new None<T>()
  }

  private constructor() {
    super(true)
  }

  getOrElse(alternative: Lazy<T>): T {
    return alternative()
  }

  getOrNull(): T | null {
    return null
  }

  orElse(alternative: Lazy<Opt<T>>): Opt<T> {
    return alternative()
  }

  get(): T {
    throw "No value to get"
  }

  map<U>(f: (t: T) => U): Opt<U> {
    return new None()
  }

  flatMap<U>(f: (t: T) => Opt<U>): Opt<U> {
    return new None()
  }

  filter(f: (t: T) => boolean): Opt<T> {
    return this
  }

  toString(): string {
    return "None"
  }
}

// Helper functions for instantiation
export const some = <T>(t: T): Some<T> => Some.of(t)
export const none = <T>(): None<T> => None.of()
// Anything falsy goes to None
export const opt = <T>(t: T): Opt<T> => (t ? some(t) : none())
