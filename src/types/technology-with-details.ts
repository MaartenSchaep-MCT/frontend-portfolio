import { RenderableTreeNodes } from '@markdoc/markdoc'

import { Technology } from '@/types/technology'

export type TechnologyWithDetails = Technology & {
  renderedExperience: RenderableTreeNodes
}
