/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  redirects: async () => [{
    source: '/',
    destination: '/administration/members',
    permanent: true,
  }]
};

module.exports = nextConfig;
