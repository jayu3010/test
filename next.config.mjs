/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // This allows production builds to complete even if there are TypeScript errors.
        ignoreBuildErrors: true,
      },
    output: 'export',
};
export default nextConfig;
