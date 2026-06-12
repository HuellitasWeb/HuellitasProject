// next.config.js

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/dorljfo6v/**',
        },
        {
          protocol: 'https',
          hostname: 'bucket-crabstorage-files.s3.amazonaws.com',
          port: '',
          pathname: '/storage/**',
        },
        // Legado: los documentos antiguos de Firestore aún guardan URLs de Firebase
        // Storage (rotas, 402). Sin este pattern, next/image lanza error de hostname
        // al renderizarlas. Quitar cuando todos los registros tengan imagen nueva.
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/huellitasctgna.appspot.com/o/**',
        },
      ],
    },
};

export default nextConfig;
