import { Entry } from '@keystatic/core/reader'

import config from '../../keystatic.config'

export type Project = Omit<Entry<typeof config.collections.projects>, 'content'>
