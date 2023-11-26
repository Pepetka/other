/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cybersport.metaratings.ru',
				port: '',
				pathname: '/upload/**',
			},
		],
	},
}

module.exports = nextConfig
