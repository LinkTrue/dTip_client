import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://1c52ae55ca7d3f76d020d43f8d5081e9@o4508105255616512.ingest.de.sentry.io/4508959152668752",

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
