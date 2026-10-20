import type { NextConfig } from 'next';

const staticExport = process.env.CASA4_STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  ...(staticExport ? { output: 'export' as const } : {}),
  images: { unoptimized: staticExport },
  trailingSlash: true,
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ['terminal.local'],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
