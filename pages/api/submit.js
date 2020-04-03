import sanity from '@sanity/client';

const client = sanity({
  projectId: 'o0yv210b',
  dataset: 'production',
  token: process.env.STKILDA_SANITY
});

export default async (req, res) => {
  const doc = {
    _type: 'submission',
    datetime: new Date(),
    values: JSON.stringify(req.body)
  };

  client.create(doc).then(result => {
    res.status(200).json({outcome: 'Form was submitted', result});
  });
};
