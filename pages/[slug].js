/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../components/block-text-serializer';
import Layout from '../components/layout';
import {menuQuery, pageQuery, defaultQuery, footerQuery} from '../lib/queries';

const Page = props => {
  const {menuData, mainData, defaultData, footerData} = props;

  const hasGrid = element => element._type === 'gridblock';

  return (
    <Layout {...props}>
      <article
        sx={{
          maxWidth: mainData.body.some(hasGrid) ? '1200px' : '700px',
          margin: 'auto',
          padding: '15px'
        }}
      >
        <Styled.h2 sx={{textAlign: 'center'}}>{mainData.title}</Styled.h2>
        <SanityBlock blocks={mainData.body} />
      </article>
    </Layout>
  );
};

Page.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

Page.getInitialProps = async ({query}) => {
  const results = await fetchQuery(
    `{
        "mainData": ${pageQuery(query.slug)},
        "menuData": ${menuQuery},
        "defaultData": ${defaultQuery},
        "footerData": ${footerQuery}
    }`
  );
  return results;
};

export default Page;
