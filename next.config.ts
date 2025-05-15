import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sequelize'],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (isServer) {
      config.externals = [
        ...config.externals,
        'pg',
        { 'sqlite3': 'commonjs sqlite3', },
        'tedious',
        'pg-hstore'
      ];
    }
    return config
  },
};

export default nextConfig;
