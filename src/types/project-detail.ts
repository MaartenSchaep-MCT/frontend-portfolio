import { RenderableTreeNodes } from '@markdoc/markdoc'

import { Project } from '@/types/project'

export type ProjectDetail = Project & {
  renderable: RenderableTreeNodes
}
