import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
};


// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
    org: "ilad-o4",
    project: "dtip",
    // Only print logs for uploading source maps in CI
    // Set to `true` to suppress logs
    silent: !process.env.CI,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  });

// export default nextConfig;
