/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Pin the workspace root so Next does not infer it from a stray parent lockfile
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
