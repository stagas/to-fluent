import { inspectWithPreamble } from '@n1kk/intspector'
import { toFluent } from '../src'

const typeTest = (body: string) => {
  try {
    inspectWithPreamble(`
      import { toFluent } from '../src'
      ${body}
    `)({})
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return typeof error[0].messageText === 'object'
      ? error[0].messageText.messageText
      : error[0].messageText
  }
}

describe('cb = toFluent(settingsSchema, cb)', () => {
  it('boolean and string optional', () => {
    const cb = toFluent(
      class {
        foo = Boolean
        bar = String
      },
      settings => () => settings
    )

    expect(cb()).toEqual({})
    expect(cb.foo()).toEqual({ foo: true })
    expect(cb.bar('hello')()).toEqual({ bar: 'hello' })
    expect(cb.bar('hello').foo()).toEqual({ foo: true, bar: 'hello' })

    expect(typeTest(`
      const cb = toFluent(class {
        foo = Boolean
        bar = String
      }, settings => () => [settings.foo, settings.bar])

      cb.wrong()

    `)).toContain('Property \'wrong\' does not exist')
    // cb.wrong('hello')

    expect(typeTest(`
      const cb = toFluent(class {
        foo = Boolean
        bar = String
      }, settings => () => [settings.foo, settings.bar])

      cb.bar(123)()

    `)).toContain('Argument of type \'number\' is not assignable to parameter of type \'string\'.')
    // cb.bar(123)()
  })

  it('with default parameter and string type', () => {
    const cb = toFluent(
      class {
        foo = false
        bar?: string
      },
      settings => () => settings
    )

    expect(cb()).toEqual({ foo: false })
    expect(cb.foo()).toEqual({ foo: true })
    expect(cb.bar('hello')()).toEqual({ foo: false, bar: 'hello' })
    expect(cb.bar('hello').foo()).toEqual({ foo: true, bar: 'hello' })

    expect(typeTest(`
      const cb = toFluent(
        class {
          foo = false
          bar?: string
        },
        settings => () => settings
      )

      cb.bar(123)()

    `)).toContain('Argument of type \'number\' is not assignable to parameter of type \'string\'.')
    // cb.bar(123)()
  })

  it('negate boolean', () => {
    const cb = toFluent(
      class {
        foo = Boolean
        bar?: string
      },
      settings => () => settings
    )

    expect(cb()).toEqual({})
    expect(cb.foo()).toEqual({ foo: true })
    expect(cb.not.foo()).toEqual({ foo: false })

    expect(typeTest(`
      const cb = toFluent(
        class {
          foo = Boolean
          bar?: string
        },
        settings => () => settings
      )

      cb.not.bar('hello')

    `)).toContain('This expression is not callable.')
    // cb.not.bar('hello')

    expect(typeTest(`
      const cb = toFluent(
        class {
          foo = Boolean
          bar?: string
        },
        settings => () => settings
      )

      cb.not('hello')

    `)).toContain('This expression is not callable.')
    // cb.not('hello')
  })

  it('passes arguments', () => {
    const cb = toFluent(
      class {
        bar?: string
      },
      settings => (arg: string) => arg + (settings.bar ?? '')
    )

    expect(cb('hello')).toEqual('hello')
    expect(cb.bar('world')('hello')).toEqual('helloworld')

    expect(typeTest(`
      const cb = toFluent(
        class {
          foo = false
          bar?: string
        },
        settings => () => settings
      )

      cb.bar(123)('hello')

    `)).toContain('Argument of type \'number\' is not assignable to parameter of type \'string\'.')
    // cb.bar(123)('hello')
  })

  it('kitchen sink optionals', () => {
    const cb = toFluent(
      class {
        bool = Boolean
        string = String
        number = Number
        boolType?: boolean
        stringType?: string
        numberType?: number
        object?: object
        objectType?: { specific: string }
      },
      settings => () => settings
    )

    expect(cb()).toEqual({})
    expect(cb.bool()).toEqual({
      bool: true,
    })
    expect(cb.not.bool()).toEqual({
      bool: false,
    })
    expect(cb.number(123)()).toEqual({
      number: 123,
    })
    expect(cb.object({ anything: 'really' })()).toEqual({
      object: { anything: 'really' },
    })
    expect(cb.objectType({ specific: 'type' })()).toEqual({
      objectType: { specific: 'type' },
    })
  })

  it('kitchen sink defaults', () => {
    const cb = toFluent(
      class {
        bool = false
        string = 'string'
        number = 123
        object = {}
      },
      settings => () => settings
    )

    expect(cb()).toEqual({
      bool: false,
      string: 'string',
      number: 123,
      object: {},
    })

    expect(cb.bool()).toEqual({
      bool: true,
      string: 'string',
      number: 123,
      object: {},
    })

    expect(cb.bool.string('foo').number(456).object({ thing: true })()).toEqual({
      bool: true,
      string: 'foo',
      number: 456,
      object: { thing: true },
    })
  })
})
