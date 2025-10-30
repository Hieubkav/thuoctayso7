const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "sonner",
      "@radix-ui/react-slot",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-tabs",
    ],
  },
  eslint: {
    dirs: ["app", "components", "features", "lib", "tests"],
  },
};

export default nextConfig;
