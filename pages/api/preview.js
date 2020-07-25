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

export default async function preview(request, response) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  console.log(inspect(request, {getters: true, depth: 2}))

  if (
    request.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !request.query.slug
  ) {
    return response.status(401).json({message: 'Invalid token'});
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await testSlug(request.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return response.status(401).json({message: 'Invalid slug'});
  }

  // Enable Preview Mode by setting the cookies
  response.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  response.writeHead(307, {Location: `/${post.mainData.slug.current}`});
  response.end();
}
