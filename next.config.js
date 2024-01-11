/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  swcMinify: true,
  images: {
   formats: ["image/webp"],
   minimumCacheTTL: 31536000,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["m8q0hkg7wgvjofbx.public.blob.vercel-storage.com","lh3.googleusercontent.com", "vercel.com", "i.ibb.co", "tailwindui.com", "api.dicebear.com"],
  },
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN
  }
  
};

module.exports = nextConfig;
