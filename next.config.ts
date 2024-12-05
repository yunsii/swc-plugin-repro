import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin",
        {
          // Optional
          // Unlike the JS version this option must be passed as object only.
          // Docs https://lingui.dev/ref/conf#runtimeconfigmodule
          // "runtimeModules": {
          //   "i18n": ["@lingui/core", "i18n"],
          //   "trans": ["@lingui/react", "Trans"]
          // }
        },
      ],
    ],
  },
  transpilePackages: [
    // ref: https://github.com/ant-design/ant-design/pull/47990
    "antd",
    "rc-util",
    "@ant-design",
  ],
};

export default nextConfig;
