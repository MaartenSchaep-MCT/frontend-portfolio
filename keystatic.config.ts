import { collection, config, fields } from '@keystatic/core'

const isProduction = process.env.NODE_ENV === 'production'
export default config({
  storage: isProduction
    ? {
        kind: 'github',
        repo: {
          owner: 'MaartenSchaep-MCT',
          name: 'frontend-portfolio',
        },
      }
    : {
        kind: 'local',
      },
  collections: {
    projects: collection({
      label: 'Projects EN',
      slugField: 'title',
      path: 'src/content/projects/en/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        thumbnail: fields.cloudImage({
          label: 'Thumbnail',
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tag',
          itemLabel: props => props.value,
        }),
        links: fields.array(
          fields.object({
            title: fields.text({
              label: 'Label',
              validation: { isRequired: true },
            }),
            isCTA: fields.checkbox({ label: 'Is CTA' }),

            url: fields.url({ label: 'URL', validation: { isRequired: true } }),
          }),
          {
            label: 'URL',
            description: "Url's for the project",
            itemLabel: props => props.fields.title.value,
          },
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    projectsNL: collection({
      label: 'Projects NL',
      slugField: 'title',
      path: 'src/content/projects/nl/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        thumbnail: fields.cloudImage({
          label: 'Thumbnail',
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tag',
          itemLabel: props => props.value,
        }),
        links: fields.array(
          fields.object({
            title: fields.text({
              label: 'Label',
              validation: { isRequired: true },
            }),
            isCTA: fields.checkbox({ label: 'Is CTA' }),

            url: fields.url({ label: 'URL', validation: { isRequired: true } }),
          }),
          {
            label: 'URL',
            description: "Url's for the project",
            itemLabel: props => props.fields.title.value,
          },
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    technologies: collection({
      label: 'Technologies EN',
      slugField: 'title',
      path: 'src/content/technologies/en/*',
      format: { contentField: 'experience' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        icon: fields.image({
          label: 'Icon',
          directory: 'public/images/technologies',
          publicPath: '/images/technologies/',
          validation: { isRequired: true },
        }),
        experience: fields.markdoc({ label: 'Experience' }),
        projects: fields.array(
          fields.relationship({
            label: 'Projects',
            description: 'All projects related to this technology',
            collection: 'projects',
          }),
          {
            label: 'Projects',
            itemLabel: props => props.value || '',
          },
        ),
      },
    }),
    technologiesNL: collection({
      label: 'Technologies NL',
      slugField: 'title',
      path: 'src/content/technologies/nl/*',
      format: { contentField: 'experience' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        icon: fields.image({
          label: 'Icon',
          directory: 'public/images/technologies',
          publicPath: '/images/technologies/',
          validation: { isRequired: true },
        }),
        experience: fields.markdoc({ label: 'Experience' }),
        projects: fields.array(
          fields.relationship({
            label: 'Projects',
            description: 'All projects related to this technology',
            collection: 'projectsNL',
          }),
          {
            label: 'Projects',
            itemLabel: props => props.value || '',
          },
        ),
      },
    }),
  },
})
