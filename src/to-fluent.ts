import { omit } from 'pick-omit'

export type Fn<T extends unknown[], R> = (...args: T) => R
export type Class<T> = new(...args: any[]) => T
export type ValueConstructor = typeof Boolean | typeof Number | typeof String

export type PropsType<T> = {
  [K in keyof T]: T[K] extends ValueConstructor ? ReturnType<T[K]> : T[K]
}

export type FluentNegated<C, T> =
  & C
  & {
    [K in keyof T]: T[K] extends boolean ? Fluent<C, T>
      : never
  }

export type Fluent<C, T> =
  & C
  & {
    [K in keyof T]: T[K] extends infer U ? U extends boolean ? Fluent<C, T>
    : Fn<[U], Fluent<C, T>>
      : never
  }
  & {
    not: FluentNegated<C, T>
  }

/**
 * Convert a function with a settings object to fluent API.
 *
 * ```ts
 * const cb = toFluent(
 *   class {
 *     foo = Boolean
 *     bar?: string
 *   },
 *   settings => () => settings
 * )
 *
 * expect(cb()).toEqual({})
 * expect(cb.foo()).toEqual({ foo: true })
 * expect(cb.not.foo()).toEqual({ foo: false })
 * expect(cb.bar('hello')()).toEqual({ bar: 'hello' })
 * expect(cb.bar('hello').foo()).toEqual({ foo: true, bar: 'hello' })
 * ```
 */
export const toFluent = <
  T extends Class<any>,
  C extends Fn<any, any>,
>(
  Schema: T,
  cb: (settings: PropsType<InstanceType<T>>) => C,
) => {
  const constructorKeys = Object.entries(new Schema())
    .filter(([, x]: any) => [Boolean, Number, String].includes(x))
    .map(([key]) => key)

  const booleanKeys = Object.entries(new Schema())
    .filter(([, x]) => x === Boolean || typeof x === 'boolean')
    .map(([key]) => key)

  let settings: InstanceType<T>
  const reset = () => settings = omit(new Schema(), constructorKeys) as InstanceType<T>
  reset()

  let negateNext = false

  return new Proxy(cb, {
    get(_, key: string, receiver) {
      if (key === 'not') {
        negateNext = true
        return receiver
      } else if (booleanKeys.includes(key)) {
        settings[key] = negateNext ? false : true
        negateNext = false
        return receiver
      } else {
        return (value: any) => {
          settings[key] = value
          return receiver
        }
      }
    },
    apply(_, self, args) {
      const s: InstanceType<T> = { ...settings }
      reset()
      return cb.call(self, s).apply(self, args)
    },
  }) as Fluent<C, Required<PropsType<InstanceType<T>>>>
}
