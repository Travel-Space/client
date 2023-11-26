/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/users",
        permanent: true,
      },
      {
        source: "/mypage",
        destination: "/mypage/statistics",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_SOCKET_CHAT_URI: process.env.NEXT_PUBLIC_SOCKET_CHAT_URI,
    NEXT_PUBLIC_SOCKET_NOTIFICATION_URI: process.env.NEXT_PUBLIC_SOCKET_NOTIFICATION_URI,
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    NEXT_PUBLIC_COUNTRY_API_KEY: process.env.NEXT_PUBLIC_COUNTRY_API_KEY,
  },
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travelspace-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/",
      },
    ],
    domains: [
      `travelspace-bucket.s3.ap-northeast-2.amazonaws.com`,
      `example.com`,
      `item.kakaocdn.net`,
      `opendata.mofa.go.kr`,
      `travelspace.world`,
    ],
  },
};

module.exports = nextConfig;
