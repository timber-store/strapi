export default ({ env }) => {
  const spacesCdnUrl = env(
    "DO_SPACE_CDN_URL",
    env(
      "SPACES_CDN_URL",
      "https://timber-store.ams3.cdn.digitaloceanspaces.com",
    ),
  );

  return [
    "strapi::logger",
    "strapi::errors",
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "https:"],
            "img-src": [
              "'self'",
              "data:",
              "blob:",
              "https://market-assets.strapi.io",
              spacesCdnUrl,
            ],
            "media-src": [
              "'self'",
              "data:",
              "blob:",
              "https://market-assets.strapi.io",
              spacesCdnUrl,
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
