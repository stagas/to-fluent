

<h1>
to-fluent <a href="https://npmjs.org/package/to-fluent"><img src="https://img.shields.io/badge/npm-v1.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-61-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/to-fluent@1.0.0/dist/to-fluent.min.js"><img src="https://img.shields.io/badge/brotli-304b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
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

<p>  <details id="Class$7" title="TypeAlias" ><summary><span><a href="#Class$7">#</a></span>  <code><strong>Class</strong></code>    </summary>  <a href="src/to-fluent.ts#L4">src/to-fluent.ts#L4</a>  <ul><p><details id="__type$8" title="Constructor" ><summary><span><a href="#__type$8">#</a></span>  <em>(args)</em>    </summary>  <a href="src/to-fluent.ts#L4">src/to-fluent.ts#L4</a>  <ul>    <p>  <details id="__type$9" title="ConstructorSignature" ><summary><span><a href="#__type$9">#</a></span>  <code><strong>new</strong></code><em>()</em>    </summary>    <ul><p><a href="#T$11">T</a></p>      <p>  <details id="args$10" title="Parameter" ><summary><span><a href="#args$10">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details></p>  </ul></details></p>    </ul></details></p>        </ul></details><details id="Fluent$15" title="TypeAlias" ><summary><span><a href="#Fluent$15">#</a></span>  <code><strong>Fluent</strong></code>    </summary>  <a href="src/to-fluent.ts#L11">src/to-fluent.ts#L11</a>  <ul><p><a href="#C$18">C</a> &amp; [K   in   keyof     <a href="#T$19">T</a>  ]:  <a href="#T$19">T</a>  [<span>K</span>] extends inferred ? <span>U</span> extends boolean ? <a href="#Fluent$15">Fluent</a>&lt;<a href="#C$18">C</a>, <a href="#T$19">T</a>&gt; : <a href="#Fn$1">Fn</a>&lt;tuple, <a href="#Fluent$15">Fluent</a>&lt;<a href="#C$18">C</a>, <a href="#T$19">T</a>&gt;&gt; : never &amp; {<p>  <details id="not$17" title="Property" ><summary><span><a href="#not$17">#</a></span>  <code><strong>not</strong></code>    </summary>  <a href="src/to-fluent.ts#L19">src/to-fluent.ts#L19</a>  <ul><p>[K   in   keyof     <a href="#T$19">T</a>  ]:  <a href="#T$19">T</a>  [<span>K</span>] extends boolean ? <a href="#Fluent$15">Fluent</a>&lt;<a href="#C$18">C</a>, <a href="#T$19">T</a>&gt; : never</p>        </ul></details></p>}</p>        </ul></details><details id="Fn$1" title="TypeAlias" ><summary><span><a href="#Fn$1">#</a></span>  <code><strong>Fn</strong></code>    </summary>  <a href="src/to-fluent.ts#L3">src/to-fluent.ts#L3</a>  <ul><p><details id="__type$2" title="Function" ><summary><span><a href="#__type$2">#</a></span>  <em>(args)</em>    </summary>    <ul>    <p>    <details id="args$4" title="Parameter" ><summary><span><a href="#args$4">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p><a href="#T$5">T</a></p>        </ul></details>  <p><strong></strong><em>(args)</em>  &nbsp;=&gt;  <ul><a href="#R$6">R</a></ul></p></p>    </ul></details></p>        </ul></details><details id="PropsType$13" title="TypeAlias" ><summary><span><a href="#PropsType$13">#</a></span>  <code><strong>PropsType</strong></code>    </summary>  <a href="src/to-fluent.ts#L7">src/to-fluent.ts#L7</a>  <ul><p>[K   in   keyof     <a href="#T$14">T</a>  ]:  <a href="#T$14">T</a>  [<span>K</span>] extends <a href="#ValueConstructor$12">ValueConstructor</a> ? <span>ReturnType</span>&lt;<a href="#T$14">T</a>  [<span>K</span>]&gt; : <a href="#T$14">T</a>  [<span>K</span>]</p>        </ul></details><details id="ValueConstructor$12" title="TypeAlias" ><summary><span><a href="#ValueConstructor$12">#</a></span>  <code><strong>ValueConstructor</strong></code>    </summary>  <a href="src/to-fluent.ts#L5">src/to-fluent.ts#L5</a>  <ul><p>typeof   <span>Boolean</span> | typeof   <span>Number</span> | typeof   <span>String</span></p>        </ul></details><details id="toFluent$20" title="Function" ><summary><span><a href="#toFluent$20">#</a></span>  <code><strong>toFluent</strong></code><em>(Schema, cb)</em>     &ndash; Convert a function with a settings object to fluent API.</summary>  <a href="src/to-fluent.ts#L44">src/to-fluent.ts#L44</a>  <ul>    <p>  <p>

```ts
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
expect(cb.bar('hello')()).toEqual({ bar: 'hello' })
expect(cb.bar('hello').foo()).toEqual({ foo: true, bar: 'hello' })
```


</p>
  <details id="Schema$24" title="Parameter" ><summary><span><a href="#Schema$24">#</a></span>  <code><strong>Schema</strong></code>    </summary>    <ul><p><a href="#T$22">T</a></p>        </ul></details><details id="cb$25" title="Function" ><summary><span><a href="#cb$25">#</a></span>  <code><strong>cb</strong></code><em>(settings)</em>    </summary>    <ul>    <p>    <details id="settings$28" title="Parameter" ><summary><span><a href="#settings$28">#</a></span>  <code><strong>settings</strong></code>    </summary>    <ul><p><a href="#PropsType$13">PropsType</a>&lt;<span>InstanceType</span>&lt;<a href="#T$22">T</a>&gt;&gt;</p>        </ul></details>  <p><strong>cb</strong><em>(settings)</em>  &nbsp;=&gt;  <ul><a href="#C$23">C</a></ul></p></p>    </ul></details>  <p><strong>toFluent</strong>&lt;<span>T</span><span>&nbsp;extends&nbsp;</span>     <a href="#Class$7">Class</a>&lt;any&gt;, <span>C</span><span>&nbsp;extends&nbsp;</span>     <a href="#Fn$1">Fn</a>&lt;any, any&gt;&gt;<em>(Schema, cb)</em>  &nbsp;=&gt;  <ul><a href="#Fluent$15">Fluent</a>&lt;<a href="#C$23">C</a>, <span>Required</span>&lt;<a href="#PropsType$13">PropsType</a>&lt;<span>InstanceType</span>&lt;<a href="#T$22">T</a>&gt;&gt;&gt;&gt;</ul></p></p>    </ul></details></p>

## Credits
- [pick-omit](https://npmjs.org/package/pick-omit) by [stagas](https://github.com/stagas) &ndash; The two missing object methods we always need.

## Contributing

[Fork](https://github.com/stagas/to-fluent/fork) or [edit](https://github.dev/stagas/to-fluent) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
