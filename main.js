import MarkdownIt from 'markdown-it'
import pluginMdc from 'markdown-it-mdc'

const md = new MarkdownIt()
  .use(pluginMdc, {
    syntax: {
      // inlineComponent: false,
      // inlineProps: false,
      // inlineSpan: false,
      // blockComponent: false,
    }
  })

const result = md.render(`
# Hello

Hello **World** with :my-component{.text-red name="foo"}!

Here is some [span]{.text-red}!
`)

console.log(result)
