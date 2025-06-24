/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // GitHub Pages specific settings
  output: "export", // enables next export
  distDir: "out", // folder for static export
  images: {
    unoptimized: true, // disables Next.js image optimization
  },
  basePath: "/saaslandingPage", // replace with your repo name
  assetPrefix: "/saaslandingPage/", // replace with your repo name
};

export default nextConfig;
