import { Entry } from '@keystatic/core/reader'

import config from '../../keystatic.config'

type ProjectEntry = Entry<typeof config.collections.projects>
export type ProjectLink = ProjectEntry['links'][number]
