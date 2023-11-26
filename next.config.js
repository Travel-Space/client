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
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
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
    ],
  },
};

module.exports = nextConfig;
