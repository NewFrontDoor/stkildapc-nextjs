import React from "react";

const crawlableRobotsTxt = `User-agent: *\nAllow: /`;

const uncrawlableRobotsTxt = `User-agent: *\nDisallow: /`;

class Robots extends React.Component {
	static async getInitialProps({ res }) {
		res.setHeader("Content-Type", "text/plain");
		// Return a non-crawlable robots.txt in non-production environments
		res.write(process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? crawlableRobotsTxt : uncrawlableRobotsTxt);
		res.end();
	}
}

export default Robots;
