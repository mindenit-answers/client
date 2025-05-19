import katex from 'katex'
import MarkdownIt from 'markdown-it'
// @ts-expect-error There is no types in package
import tm from 'markdown-it-texmath'

export const useMarkdown = () => {
  const markdown = new MarkdownIt({
    html: true,
    breaks: true,
  })
    .disable(['heading', 'link', 'image', 'list', 'blockquote'])
    .use(tm, {
      delimiters: 'dollars',
      engine: katex,
    })

  const originalRender = markdown.render.bind(markdown)
  markdown.render = (src: string) => {
    const processedSrc = src.replace(/\n/g, '<br>\n')
    return originalRender(processedSrc)
  }

  return { markdown }
}
