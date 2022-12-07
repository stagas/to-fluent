import { omit } from 'pick-omit'

import type { Class, Fn } from 'everyday-types'

export type Fluent<C, T> =
  & C
  & {
    [K in keyof T]-?: T[K] extends boolean ? Fluent<C, T>
    : Fn<[T[K]], Fluent<C, T>>
  }
  & {
    not: {
      [K in keyof T]-?: T[K] extends boolean ? Fluent<C, T>
      : never
    }
  }

export const bool = Symbol.for('to-fluent-bool') as unknown as boolean

/**
 * Convert a function with a settings object to fluent API.
 *
 * ```ts
 * import { toFluent, bool } from 'to-fluent'
 *
 * const cb = toFluent(
 *   class {
 *     foo = bool // indicate boolean but initially omitted
 *     bar?: string // optional
 *     zoo = 123 // a default
 *   },
 *   settings => () => settings
 * )
 *
 * expect(cb()).toEqual({ zoo: 123 })
 * expect(cb.foo()).toEqual({ foo: true, zoo: 123 })
 * expect(cb.not.foo()).toEqual({ foo: false, zoo: 123 })
 * expect(cb.bar('hello')()).toEqual({ bar: 'hello', zoo: 132 })
 * expect(cb.foo.bar('hello').zoo(456)())
 *   .toEqual({ foo: true, bar: 'hello', zoo: 456 })
 * ```
 */
export const toFluent = <
  T extends Class<any>,
  C extends Fn<any, any>,
  S extends InstanceType<T>,
>(
  Schema: T,
  cb: (settings: S) => C,
) => {
  const bools = Object.entries(new Schema()).filter(([, x]) => x === bool || typeof x === 'boolean')
  const flags = bools.map(([key]) => key)
  const omitted = bools.filter(([, x]) => x === bool).map(([key]) => key)

  const settings = omit(new Schema(), omitted) as S

  let not = false

  const bind = (settings: S): Fluent<C, Required<S>> =>
    new Proxy(cb, {
      get(_, key: string, receiver) {
        if (key === 'not') {
          not = true
          return receiver
        } else if (flags.includes(key)) {
          const value = not ? false : true
          not = false
          return bind({ ...settings, [key]: value })
        } else {
          return (value: any) => {
            return bind({ ...settings, [key]: value })
          }
        }
      },
      construct(_, args) {
        const ctor = cb.call(self, { ...settings }) as any
        return new ctor(...args)
      },
      apply: (_, self, args) => cb.call(self, { ...settings }).apply(self, args),
    }) as Fluent<C, Required<S>>

  return bind(settings)
}
