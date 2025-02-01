/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push(({ context, request }, callback) => {
        if (request && request.endsWith(".test.ts")) {
          return callback(null, "commonjs " + request);
        }
        callback();
      });
    }
    return config;
  },
};

export default nextConfig;