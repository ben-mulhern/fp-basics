import LazyList from "./LazyList"

export type Lazy<T> = () => T

export const lazy = <T>(t: T): Lazy<T> => () => t
