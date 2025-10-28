import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const nextConfig = {
  experimental: {
    serverActions: true
  }
};

export default nextConfig;
