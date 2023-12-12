# Testing MarkdownIt MDC

Listing bugs / problems with MarkdownIt MDC

## Setting up

I use the packages in the current `package-lock.json` and always use the following exact text:

```md
# Hello

Hello **World** with :my-component{.text-red name="foo"}!

Here is some [span]{.text-red}!
```

Problematic is, that there's no block component included and disabling it is therefore not really interesting. I'll probably update all examples some other time, with a block component included.

## Standard Behavior

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong> with <my-component class="text-red" name="foo" !="true"></p>
<p>Here is some <span class="text-red">span</span>!</p>
```

The `!` shouldn't be inside the attributes.
It seems like the closing `}` of props is ignored

## Turning off different Plugins (1)

### `inlineComponent`

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong><span class="text-red" name="foo" !="true"> with :my-component</span></p>
<p>Here is some <span class="text-red">span</span>!</p>
```

The inline props seem create some unwritten `span` around the component back to the last markdown item (here `**`) or the start of a block

### `inlineProps`

```log
/home/path/to/project/test-mdit-mdc/node_modules/markdown-it/lib/ruler.js:198
  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }
                            ^

Error: Parser rule not found: mdc_inline_props
    at Ruler.after (/home/path/to/project/test-mdit-mdc/node_modules/markdown-it/lib/ruler.js:198:29)
    at Function.MarkdownItInlineSpan (file:///home/path/to/project/test-mdit-mdc/node_modules/markdown-it-mdc/dist/index.mjs:531:19)
    at MarkdownIt.use (/home/path/to/project/test-mdit-mdc/node_modules/markdown-it/lib/index.js:497:10)
    at Function.MarkdownItMdc (file:///home/path/to/project/test-mdit-mdc/node_modules/markdown-it-mdc/dist/index.mjs:575:8)
    at MarkdownIt.use (/home/path/to/project/test-mdit-mdc/node_modules/markdown-it/lib/index.js:497:10)
    at file:///home/path/to/project/test-mdit-mdc/main.js:5:4
    at ModuleJob.run (node:internal/modules/esm/module_job:217:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:66:12)

Node.js v20.8.1
```

### `inlineSpan`

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong> with <my-component class="text-red" name="foo" !="true"></p>
<p><span class="text-red"><span class="text-red">Here is some [span]</span></span>!</p>
```

Same issue as [`inlineProps`](#inlineprops) but for the `span` block area

### `blockComponent`

Same as [Standard Behavior](#standard-behavior)

## Turning off different Plugins (2)

### `inlineComponent` & `inlineProps`

Same as [`inlineProps`](#inlineprops)

### `inlineComponent` & `inlineSpan`

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong><span class="text-red" name="foo" !="true"> with :my-component</span></p>
<p><span class="text-red"><span class="text-red">Here is some [span]</span></span>!</p>
```

Same as [`inlineComponent`](#inlinecomponent) and [`inlineSpan`](#inlinespan) combined

### `inlineComponent` & `blockComponent`

Same as [`inlineComponent`](#inlinecomponent)

### `inlineProps` & `inlineSpan`

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong> with <my-component>{.text-red name=&quot;foo&quot;}!</p>
<p>Here is some [span]{.text-red}!</p>
```

Correct result

### `inlineProps` & `blockComponent`

Same as [`inlineProps`](#inlineprops)

### `inlineSpan` & `blockComponent`

Same as [`inlineSpan`](#inlinespan)

## Turning off different Plugins (3)

### `inlineComponent` & `inlineProps` & `inlineSpan`

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong> with :my-component{.text-red name=&quot;foo&quot;}!</p>
<p>Here is some [span]{.text-red}!</p>
```

Correct, as no block component is used...

### `inlineComponent` & `inlineProps` & `blockComponent`

Same as [`inlineProps`](#inlineprops)

### `inlineComponent` & `inlineSpan` & `blockComponent`

Same as [`inlineComponent` & `inlineSpan`](#inlinecomponent--inlinespan)

### `inlineProps` & `inlineSpan` & `blockComponent`

Same as [`inlineProps` & `inlineSpan`](#inlineprops--inlinespan)

## Turning off all Plugins

```html
<h1>Hello</h1>
<p>Hello <strong>World</strong> with :my-component{.text-red name=&quot;foo&quot;}!</p>
<p>Here is some [span]{.text-red}!</p>
```

Correct, as expected
