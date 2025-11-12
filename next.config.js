/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // this enables static export
  images: { unoptimized: true }, // GitHub Pages doesn't support next/image optimization
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
