/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Supabase Storage public bucket (configure project ref in env)
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  // three / r3f friendly transpile
  transpilePackages: ["three"]
};

export default nextConfig;
