import type { NextConfig } from "next";

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
