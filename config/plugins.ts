export default ({ env }) => {
  const bucket = env("DO_SPACE_BUCKET", env("SPACES_BUCKET"));

  // Keep local development self-contained unless a Space is configured.
  if (!bucket) return {};

  const accessKeyId = env(
    "DO_SPACE_ACCESS_KEY_ID",
    env("DO_SPACE_ACCESS_KEY", env("SPACES_ACCESS_KEY_ID")),
  );
  const secretAccessKey = env(
    "DO_SPACE_SECRET_ACCESS_KEY",
    env("SPACES_SECRET_ACCESS_KEY"),
  );

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "DO_SPACE_ACCESS_KEY_ID and DO_SPACE_SECRET_ACCESS_KEY are required when DO_SPACE_BUCKET is set.",
    );
  }

  const region = env("DO_SPACE_REGION", env("SPACES_REGION", "ams3"));

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: env(
            "DO_SPACE_CDN_URL",
            env(
              "SPACES_CDN_URL",
              `https://${bucket}.${region}.cdn.digitaloceanspaces.com`,
            ),
          ),
          rootPath: env(
            "DO_SPACE_ROOT_PATH",
            env("SPACES_ROOT_PATH", "strapi"),
          ),
          s3Options: {
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
            endpoint: env(
              "DO_SPACE_ENDPOINT",
              env(
                "SPACES_ENDPOINT",
                `https://${region}.digitaloceanspaces.com`,
              ),
            ),
            params: {
              ACL: env("DO_SPACE_ACL", env("SPACES_ACL", "public-read")),
              Bucket: bucket,
              CacheControl: env(
                "DO_SPACE_CACHE_CONTROL",
                env(
                  "SPACES_CACHE_CONTROL",
                  "public, max-age=31536000, immutable",
                ),
              ),
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
