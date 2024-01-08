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
 
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
