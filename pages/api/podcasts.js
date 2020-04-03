import * as builder from 'xmlbuilder';
import {fetchQuery} from '../../lib/sanity';
import {podcastQuery, sermonQuery} from '../../lib/queries';

const buildFeedObject = ({
  title,
  url,
  _id,
  filesize,
  description,
  pubDate,
  duration,
  passage,
  speaker
}) => {
  return {
    title: {'#text': title},
    link: {'#text': url},
    description: {'#text': description},
    enclosure: {
      '@url': `https://s3-ap-southeast-2.amazonaws.com/sermons.crossroadshobart.org/${url}`,
      '@type': 'audio/mpeg',
      '@length': filesize
    },
    guid: {
      '#text': _id
    },
    pubDate: {'#text': new Date(pubDate).toUTCString()},
    'itunes:subtitle': {'#text': passage},
    'itunes:explicit': {'#text': false},
    'itunes:summary': {'#text': description},
    'itunes:duration': {'#text': duration},
    'itunes:author': {'#text': speaker}
  };
};

export default async (req, res) => {
  try {
    const results = await fetchQuery(`{
        "podcastData": ${podcastQuery},
        "sermonData": ${sermonQuery}
    }`);

    const sermonItems = results.sermonData.map(
      item => item?.url && buildFeedObject(item)
    );

    const feedObject = {
      rss: {
        '@version': '2.0',
        '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        '@xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
        channel: {
          ...results.podcastData,
          pubDate: new Date().toUTCString(),
          lastBuildDate: new Date().toUTCString(),
          item: sermonItems
        }
      }
    };

    const podcast = builder.create(feedObject, {
      version: '1.0',
      encoding: 'utf-8'
    });

    if (res) {
      res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
      res.setHeader('Content-Type', 'application/xml');
      res.statusCode = 200;
      res.end(podcast.end({pretty: true}));
    }

    return;
  } catch (error) {
    return {error: 404, value: error};
  }
};
