/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// module.exports = (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       env: {
//         NEXTAUTH_URL: 'https://authentication-app-swart.vercel.app/'
//       }
//     }
//   }
// }
