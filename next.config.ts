import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://gpluhpsoaffqradtctus.supabase.co/storage/v1/object/public/articleimages/articles/covers/*"
      ),
    ],
  },
};

export default nextConfig;
