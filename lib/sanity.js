import {createContext} from 'react';
import sanityClient from '@sanity/client';

const getClient = preview => (preview ? previewClient : client);

const client = sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: 'o0yv210b',
  dataset: 'production',
  useCdn: true
  // UseCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
});

export const SanityContext = createContext(client);

export function fetchQuery(query, preview) {
  console.log(preview);
  return getClient(preview).fetch(query);
}

const previewClient = sanityClient({
  projectId: 'o0yv210b',
  dataset: 'production',
  token: process.env.PREVIEW_TOKEN,
  useCdn: false
});

export function previewQuery(query, parameters) {
  return previewClient.fetch(query, parameters);
}

export default client;
