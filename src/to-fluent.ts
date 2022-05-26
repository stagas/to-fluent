import { omit } from 'pick-omit'

export type Fn<T extends unknown[], R> = (...args: T) => R
export type Class<T> = new(...args: any[]) => T
export type Fluent<C, T> =
  & C
  & {
    [K in keyof T]: T[K] extends infer U ? U extends boolean ? Fluent<C, T>
    : Fn<[U], Fluent<C, T>>
      : never
  }
  & {
    not: {
      [K in keyof T]: T[K] extends boolean ? Fluent<C, T>
        : never
    }
  }

export const bool = Symbol() as unknown as boolean

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

  let settings: S
  const reset = () => settings = omit(new Schema(), omitted) as S
  reset()

  let not = false

  return new Proxy(cb, {
    get(_, key: string, receiver) {
      if (key === 'not') {
        not = true
        return receiver
      } else if (flags.includes(key)) {
        settings[key] = not ? false : true
        not = false
        return receiver
      } else {
        return (value: any) => {
          settings[key] = value
          return receiver
        }
      }
    },
    apply(_, self, args) {
      const s: S = { ...settings }
      reset()
      return cb.call(self, s).apply(self, args)
    },
  }) as Fluent<C, Required<S>>
}
