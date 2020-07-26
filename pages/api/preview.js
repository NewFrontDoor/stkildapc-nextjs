import {previewQuery} from '../../lib/sanity';
import {pageQuery} from '../../lib/queries';
import {inspect} from 'util';

async function testSlug(slug) {
  return previewQuery(
    `{
            "mainData": ${pageQuery(slug)},
        }`
  );
}

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  console.log(req.url);
  console.log(req.query);

  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({message: 'Invalid token'});
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await testSlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({message: 'Invalid slug'});
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, {Location: `/${post.mainData.slug.current}`});
  res.end();
}
