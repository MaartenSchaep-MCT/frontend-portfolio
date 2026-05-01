import { Entry } from '@keystatic/core/reader'

import config from '../../keystatic.config'

export type Technology = Omit<
  Entry<typeof config.collections.technologies>,
  'experience' | 'projects'
> & {
  projects: (Omit<Entry<typeof config.collections.projects>, 'content'> & {
    slug: string
  })[]
}
