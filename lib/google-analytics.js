export const GA_TRACKING_ID = "UA-178914631-1";
export const GA_ADS_TRACKING_TAG = "G-9X7HF8J71Q";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
	window.gtag("config", GA_TRACKING_ID, {
		page_path: url
	});
	window.gtag("config", GA_ADS_TRACKING_TAG, {
		page_path: url
	});
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
	window.gtag("event", action, {
		event_category: category,
		event_label: label,
		value: value
	});
};
