import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::theme.theme", {
  config: {
    find: {
      auth: false,
    },
  },
});
