/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  
  reactStrictMode: false,
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {fs: false};
  //   return config;
  // },

}

module.exports = nextConfig
