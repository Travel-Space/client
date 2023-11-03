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
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
