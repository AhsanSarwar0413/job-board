/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co', // The hostname for imgbb images
                port: '',             // Leave this empty unless a specific port is required
                pathname: '/**',      // Allow all image paths from this hostname
            },
        ],
    },
};

export default nextConfig;
