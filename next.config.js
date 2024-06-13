// Next.config.js
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withFonts = require("next-fonts");

const nextConfig = {
	env: {
		GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
		RESTRICTED_PAGES_PASSWORD: process.env.RESTRICTED_PAGES_PASSWORD,
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
		STKILDA_SENDGRID: process.env.STKILDA_SENDGRID,
		STKILDA_SANITY: process.env.STKILDA_SANITY,
		PREVIEW_TOKEN: process.env.PREVIEW_TOKEN,
		SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
		VERCEL_ENV: process.env.VERCEL_ENV
	},
	webpack: (config, options) => {
		// Modify the `config` here

		return config;
	}
};

module.exports = withPlugins([withFonts, [withImages, { ignoreTypes: ["svg"] }]], nextConfig);
