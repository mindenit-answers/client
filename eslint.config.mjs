import prettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.{js,ts,vue,mjs,mts}'],
  ignores: [
    'dist',
    '.nuxt',
    'node_modules',
    '.output',
    '.git',
    'build',
    'LICENSE',
    '*.md',
    'public',
    'package-lock.json',
  ],
  ...prettier,
})
