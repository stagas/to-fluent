<h1>
to-fluent <a href="https://npmjs.org/package/to-fluent"><img src="https://img.shields.io/badge/npm-v2.1.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-49-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/to-fluent@2.1.0/dist/to-fluent.min.js"><img src="https://img.shields.io/badge/brotli-319b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Convert a function with a settings object to fluent API.

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i to-fluent </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add to-fluent </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add to-fluent</code>
</td></tr></table>
</h4>

## API

<p>  <details id="Fluent$1" title="TypeAlias" ><summary><span><a href="#Fluent$1">#</a></span>  <code><strong>Fluent</strong></code>    </summary>  <a href="src/to-fluent.ts#L5">src/to-fluent.ts#L5</a>  <ul><p><a href="#C$4">C</a> &amp; [K   in   keyof     <a href="#T$5">T</a>  ]:  <a href="#T$5">T</a>  [<span>K</span>] extends boolean ? <a href="#Fluent$1">Fluent</a>&lt;<a href="#C$4">C</a>, <a href="#T$5">T</a>&gt; : <span>Fn</span>&lt;tuple, <a href="#Fluent$1">Fluent</a>&lt;<a href="#C$4">C</a>, <a href="#T$5">T</a>&gt;&gt; &amp; {<p>  <details id="not$3" title="Property" ><summary><span><a href="#not$3">#</a></span>  <code><strong>not</strong></code>    </summary>  <a href="src/to-fluent.ts#L12">src/to-fluent.ts#L12</a>  <ul><p>[K   in   keyof     <a href="#T$5">T</a>  ]:  <a href="#T$5">T</a>  [<span>K</span>] extends boolean ? <a href="#Fluent$1">Fluent</a>&lt;<a href="#C$4">C</a>, <a href="#T$5">T</a>&gt; : never</p>        </ul></details></p>}</p>        </ul></details><details id="bool$6" title="Variable" ><summary><span><a href="#bool$6">#</a></span>  <code><strong>bool</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/to-fluent.ts#L18">src/to-fluent.ts#L18</a>  <ul><p>boolean</p>        </ul></details><details id="toFluent$7" title="Function" ><summary><span><a href="#toFluent$7">#</a></span>  <code><strong>toFluent</strong></code><em>(Schema, cb)</em>     &ndash; Convert a function with a settings object to fluent API.</summary>  <a href="src/to-fluent.ts#L43">src/to-fluent.ts#L43</a>  <ul>    <p>  <p>

```ts
import { bool, toFluent } from 'to-fluent'

const cb = toFluent(
  class {
    foo = bool // indicate boolean but initially omitted
    bar?: string // optional
    zoo = 123 // a default
  },
  settings => () => settings
)

expect(cb()).toEqual({ zoo: 123 })
expect(cb.foo()).toEqual({ foo: true, zoo: 123 })
expect(cb.not.foo()).toEqual({ foo: false, zoo: 123 })
expect(cb.bar('hello')()).toEqual({ bar: 'hello', zoo: 132 })
expect(cb.foo.bar('hello').zoo(456)())
  .toEqual({ foo: true, bar: 'hello', zoo: 456 })
```

</p>
  <details id="Schema$12" title="Parameter" ><summary><span><a href="#Schema$12">#</a></span>  <code><strong>Schema</strong></code>    </summary>    <ul><p><a href="#T$9">T</a></p>        </ul></details><details id="cb$13" title="Function" ><summary><span><a href="#cb$13">#</a></span>  <code><strong>cb</strong></code><em>(settings)</em>    </summary>    <ul>    <p>    <details id="settings$16" title="Parameter" ><summary><span><a href="#settings$16">#</a></span>  <code><strong>settings</strong></code>    </summary>    <ul><p><a href="#S$11">S</a></p>        </ul></details>  <p><strong>cb</strong><em>(settings)</em>  &nbsp;=&gt;  <ul><a href="#C$10">C</a></ul></p></p>    </ul></details>  <p><strong>toFluent</strong>&lt;<span>T</span><span>&nbsp;extends&nbsp;</span>     <span>Class</span>&lt;any&gt;, <span>C</span><span>&nbsp;extends&nbsp;</span>     <span>Fn</span>&lt;any, any&gt;, <span>S</span>&gt;<em>(Schema, cb)</em>  &nbsp;=&gt;  <ul><a href="#Fluent$1">Fluent</a>&lt;<a href="#C$10">C</a>, <span>Required</span>&lt;<a href="#S$11">S</a>&gt;&gt;</ul></p></p>    </ul></details></p>

## Credits

- [everyday-types](https://npmjs.org/package/everyday-types) by [stagas](https://github.com/stagas) &ndash; Everyday utility types
- [pick-omit](https://npmjs.org/package/pick-omit) by [stagas](https://github.com/stagas) &ndash; The two missing object methods we always need.

## Contributing

[Fork](https://github.com/stagas/to-fluent/fork) or [edit](https://github.dev/stagas/to-fluent) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
