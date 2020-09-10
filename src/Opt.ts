/*
  Opt - a value may or may not be present (Some or None)
*/
export abstract class Opt<T> {
  protected constructor(readonly isEmpty: boolean) {}
  readonly isDefined: boolean = !this.isEmpty

  abstract getOrElse(alternative: () => T): T
  abstract orElse(alternative: () => Opt<T>): Opt<T>
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

  getOrElse(alternative: () => T): T {
    return this.value
  }

  orElse(alternative: () => Opt<T>): Opt<T> {
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
    return JSON.stringify(this.value)
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

  getOrElse(alternative: () => T): T {
    return alternative()
  }

  orElse(alternative: () => Opt<T>): Opt<T> {
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
    return new None()
  }

  toString(): string {
    return "None"
  }
}
