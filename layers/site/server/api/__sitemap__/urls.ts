import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'
import type { Test } from '@mindenit/answers-kit'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const response = await fetch(`${config.public.apiBaseUrl}/tests`)
  const result = await response.json()

  return result.data.map((test: Test) => ({
    loc: `/test/${test.id}`,
    lastmod: test.updatedAt,
    changefreq: 'daily',
  })) satisfies SitemapUrlInput[]
})
