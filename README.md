<h1>
to-fluent <a href="https://npmjs.org/package/to-fluent"><img src="https://img.shields.io/badge/npm-v2.0.1-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-56-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/to-fluent@2.0.1/dist/to-fluent.min.js"><img src="https://img.shields.io/badge/brotli-313b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
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

<p>  <details id="Class$7" title="TypeAlias" ><summary><span><a href="#Class$7">#</a></span>  <code><strong>Class</strong></code>    </summary>  <a href="src/to-fluent.ts#L4">src/to-fluent.ts#L4</a>  <ul><p><details id="__type$8" title="Constructor" ><summary><span><a href="#__type$8">#</a></span>  <em>(args)</em>    </summary>  <a href="src/to-fluent.ts#L4">src/to-fluent.ts#L4</a>  <ul>    <p>  <details id="__type$9" title="ConstructorSignature" ><summary><span><a href="#__type$9">#</a></span>  <code><strong>new</strong></code><em>()</em>    </summary>    <ul><p><a href="#T$11">T</a></p>      <p>  <details id="args$10" title="Parameter" ><summary><span><a href="#args$10">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details></p>  </ul></details></p>    </ul></details></p>        </ul></details><details id="Fluent$12" title="TypeAlias" ><summary><span><a href="#Fluent$12">#</a></span>  <code><strong>Fluent</strong></code>    </summary>  <a href="src/to-fluent.ts#L5">src/to-fluent.ts#L5</a>  <ul><p><a href="#C$15">C</a> &amp; [K   in   keyof     <a href="#T$16">T</a>  ]:  <a href="#T$16">T</a>  [<span>K</span>] extends inferred ? <span>U</span> extends boolean ? <a href="#Fluent$12">Fluent</a>&lt;<a href="#C$15">C</a>, <a href="#T$16">T</a>&gt; : <a href="#Fn$1">Fn</a>&lt;tuple, <a href="#Fluent$12">Fluent</a>&lt;<a href="#C$15">C</a>, <a href="#T$16">T</a>&gt;&gt; : never &amp; {<p>  <details id="not$14" title="Property" ><summary><span><a href="#not$14">#</a></span>  <code><strong>not</strong></code>    </summary>  <a href="src/to-fluent.ts#L13">src/to-fluent.ts#L13</a>  <ul><p>[K   in   keyof     <a href="#T$16">T</a>  ]:  <a href="#T$16">T</a>  [<span>K</span>] extends boolean ? <a href="#Fluent$12">Fluent</a>&lt;<a href="#C$15">C</a>, <a href="#T$16">T</a>&gt; : never</p>        </ul></details></p>}</p>        </ul></details><details id="Fn$1" title="TypeAlias" ><summary><span><a href="#Fn$1">#</a></span>  <code><strong>Fn</strong></code>    </summary>  <a href="src/to-fluent.ts#L3">src/to-fluent.ts#L3</a>  <ul><p><details id="__type$2" title="Function" ><summary><span><a href="#__type$2">#</a></span>  <em>(args)</em>    </summary>    <ul>    <p>    <details id="args$4" title="Parameter" ><summary><span><a href="#args$4">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p><a href="#T$5">T</a></p>        </ul></details>  <p><strong></strong><em>(args)</em>  &nbsp;=&gt;  <ul><a href="#R$6">R</a></ul></p></p>    </ul></details></p>        </ul></details><details id="bool$17" title="Variable" ><summary><span><a href="#bool$17">#</a></span>  <code><strong>bool</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/to-fluent.ts#L19">src/to-fluent.ts#L19</a>  <ul><p>boolean</p>        </ul></details><details id="toFluent$18" title="Function" ><summary><span><a href="#toFluent$18">#</a></span>  <code><strong>toFluent</strong></code><em>(Schema, cb)</em>     &ndash; Convert a function with a settings object to fluent API.</summary>  <a href="src/to-fluent.ts#L44">src/to-fluent.ts#L44</a>  <ul>    <p>  <p>

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
  <details id="Schema$23" title="Parameter" ><summary><span><a href="#Schema$23">#</a></span>  <code><strong>Schema</strong></code>    </summary>    <ul><p><a href="#T$20">T</a></p>        </ul></details><details id="cb$24" title="Function" ><summary><span><a href="#cb$24">#</a></span>  <code><strong>cb</strong></code><em>(settings)</em>    </summary>    <ul>    <p>    <details id="settings$27" title="Parameter" ><summary><span><a href="#settings$27">#</a></span>  <code><strong>settings</strong></code>    </summary>    <ul><p><a href="#S$22">S</a></p>        </ul></details>  <p><strong>cb</strong><em>(settings)</em>  &nbsp;=&gt;  <ul><a href="#C$21">C</a></ul></p></p>    </ul></details>  <p><strong>toFluent</strong>&lt;<span>T</span><span>&nbsp;extends&nbsp;</span>     <a href="#Class$7">Class</a>&lt;any&gt;, <span>C</span><span>&nbsp;extends&nbsp;</span>     <a href="#Fn$1">Fn</a>&lt;any, any&gt;, <span>S</span>&gt;<em>(Schema, cb)</em>  &nbsp;=&gt;  <ul><a href="#Fluent$12">Fluent</a>&lt;<a href="#C$21">C</a>, <span>Required</span>&lt;<a href="#S$22">S</a>&gt;&gt;</ul></p></p>    </ul></details></p>

## Credits

- [pick-omit](https://npmjs.org/package/pick-omit) by [stagas](https://github.com/stagas) &ndash; The two missing object methods we always need.

## Contributing

[Fork](https://github.com/stagas/to-fluent/fork) or [edit](https://github.dev/stagas/to-fluent) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
