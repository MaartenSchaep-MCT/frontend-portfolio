import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "MaartenSchaep-MCT",
      name: "frontend-portfolio",
    },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        language: fields.select({
          label: "Language",
          description: "The language of this project entry",
          options: [
            { label: "English", value: "en" },
            { label: "Dutch", value: "nl" },
          ],
          defaultValue: "en",
        }),
        description: fields.text({ label: "Description" }),
        thumbnail: fields.cloudImage({
          label: "Thumbnail",
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tag",
          itemLabel: (props) => props.value,
        }),
        links: fields.array(
          fields.object({
            title: fields.text({
              label: "Label",
              validation: { isRequired: true },
            }),

            url: fields.url({ label: "URL", validation: { isRequired: true } }),
          }),
          {
            label: "URL",
            description: "Url's for the project",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
