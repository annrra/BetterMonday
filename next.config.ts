import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      font-src 'self' data: https:;
      connect-src 'self' https://api.bettermonday.org https://va.vercel-scripts.com https://vitals.vercel-insights.com;
      media-src 'self' https://api.bettermonday.org;
      frame-ancestors 'none';
    `.replace(/\n/g, ""),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
		remotePatterns: [
			{
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bettermonday.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.bettermonday.org',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)", // applies to ALL routes
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/page/:num(\\d+)',
        destination: '/',
        permanent: true,
      },
      {
        source: '/small-stations-press/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portico/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/libertarianstvo/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/christmas/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/slideposts-ajax-pagination-plugin/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
