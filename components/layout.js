/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import PropTypes from "prop-types";
import Header from "./header/header";
import Footer from "./footer/footer";
import Head from "next/head";
import { Banner } from "./banner";

import { GA_TRACKING_ID, GA_ADS_TRACKING_TAG } from "../lib/google-analytics";

const Layout = ({ menuData, mainData, defaultData, footerData, children }) => {
	return (
		<div>
			<Head>
				<title>{mainData.title || "Welcome"} | St Kilda & Balaclava</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
				<link rel="manifest" href="/favicons/site.webmanifest" />
				<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
				<link rel="shortcut icon" href="/favicons/favicon.ico" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="msapplication-config" content="/favicons/browserconfig.xml" />
				<meta name="theme-color" content="#ffffff" />
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_TRACKING_TAG}`}></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${GA_ADS_TRACKING_TAG}', {
              page_path: window.location.pathname,
            });
          `
					}}
				/>
			</Head>
			{defaultData.frontbanner && <Banner {...defaultData.frontbanner} />}
			<Header navlinks={menuData.menuitems} />
			{children}
			<Footer data={footerData} />
		</div>
	);
};

Layout.propTypes = {
	menuData: PropTypes.object.isRequired,
	mainData: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

export default Layout;
