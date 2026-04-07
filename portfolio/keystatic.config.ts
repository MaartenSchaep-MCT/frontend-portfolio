import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "MaartenSchaep-MCT",
      name: "frontend-portfolio",
    },
  },
  collections: {},
});
