/** @jsx jsx */
import { jsx, Styled, Box, Label, Button, Input } from 'theme-ui';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchQuery } from '../../lib/sanity';
import SanityBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import { menuQuery, restrictedPageQuery, defaultQuery, footerQuery } from '../../lib/queries';

const RestrictedPage = ({ data }) => {
  const { menuData, mainData, defaultData, footerData } = data;
  const [enteredPassword, setEnteredPassword] = useState(false);
  const [password, setPassword] = useState(null);

  const hasGrid = element => element._type === 'gridblock';

  const handleChange = (e) => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPassword(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnteredPassword(true);
  }

  const resetForm = (e) => {
    e.preventDefault();
    setPassword(null)
    setEnteredPassword(false);
  }

  return (
    <Layout {...data}>
      <article
        sx={{
          maxWidth: mainData.body.some(hasGrid) ? '1200px' : '700px',
          margin: 'auto',
          padding: '15px'
        }}
      >
        <Styled.h2 sx={{ textAlign: 'center' }}>{mainData.title}</Styled.h2>
        {enteredPassword && password === process.env.RESTRICTED_PAGES_PASSWORD && <SanityBlock blocks={mainData.body} />}
        {enteredPassword && password !== null && password !== process.env.RESTRICTED_PAGES_PASSWORD &&
          <div>
            <p>Incorrect password entered</p>
            <Button onClick={resetForm}>Try Again?</Button>
          </div>}
        {!enteredPassword && <Box as="form" onSubmit={handleSubmit}>
          <Label htmlFor="password">You must enter a password to view this page</Label><br />
          <Input type="password" name="password" id="password" value={password} onChange={handleChange} mb={3} />
          <Button>Submit</Button>
        </Box>}
      </article>
    </Layout>
  );
};

RestrictedPage.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

export async function getServerSideProps(context) {
  const data = await fetchQuery(
    `{
        "mainData": ${restrictedPageQuery(context.params.slug)},
        "menuData": ${menuQuery},
        "defaultData": ${defaultQuery},
        "footerData": ${footerQuery}
    }`,
    context.preview
  );
  return { props: { data } };
}

export default RestrictedPage;
