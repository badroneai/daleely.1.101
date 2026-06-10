/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Pin the workspace root so Next does not infer it from a stray parent lockfile
  turbopack: {
    root: __dirname,
  },
  // Child-safety / security headers applied to every response.
  // Conservative set (no strict CSP that could break inline Next runtime/JSON-LD):
  // anti-clickjacking, no MIME sniffing, no powerful device APIs, no FLoC.
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ]
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

module.exports = nextConfig
