abstract class Optional<T> {
  constructor(readonly isEmpty: boolean) {}
  readonly isDefined: boolean = !this.isEmpty

  abstract getOrElse(alternative: () => T): T
  abstract orElse(alternative: () => Optional<T>): Optional<T>
  abstract get(): T
  abstract map<U>(f: (t: T) => U): Optional<U>
  abstract flatMap<U>(f: (t: T) => Optional<U>): Optional<U>
  abstract filter(f: (t: T) => boolean): Optional<T>
}

class Some<T> extends Optional<T> {
  constructor(readonly value: T) {
    super(false)
  }

  getOrElse(alternative: () => T): T {
    return this.value
  }

  orElse(alternative: () => Optional<T>): Optional<T> {
    return this
  }

  get(): T {
    return this.value
  }

  map<U>(f: (t: T) => U): Optional<U> {
    return new Some(f(this.value))
  }

  flatMap<U>(f: (t: T) => Optional<U>): Optional<U> {
    return f(this.value)
  }

  filter(f: (t: T) => boolean): Optional<T> {
    return f(this.value) ? this : new None()
  }
}

class None<T> extends Optional<T> {
  constructor() {
    super(true)
  }

  getOrElse(alternative: () => T): T {
    return alternative()
  }

  orElse(alternative: () => Optional<T>): Optional<T> {
    return alternative()
  }

  get(): T {
    throw "No value to get"
  }

  map<U>(f: (t: T) => U): Optional<U> {
    return new None()
  }

  flatMap<U>(f: (t: T) => Optional<U>): Optional<U> {
    return new None()
  }

  filter(f: (t: T) => boolean): Optional<T> {
    return new None()
  }
}
