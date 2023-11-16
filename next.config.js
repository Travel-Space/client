/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/country",
        destination: "https://ipapi.co/country",
      },
      {
        source: "/countryData/:path",
        destination: "https://apis.data.go.kr/1262000/CountryFlagService2/:path",
      },
    ];
  },
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
    //오류 생겨서 임시로 추가해둠 `example.com`,`item.kakaocdn.net`
    domains: [
      `travelspace-bucket.s3.ap-northeast-2.amazonaws.com`,
      `example.com`,
      `item.kakaocdn.net`,
      `opendata.mofa.go.kr`,
    ],
  },
};

module.exports = nextConfig;
