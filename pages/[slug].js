/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../components/block-text-serializer';
import Layout from '../components/layout';
import {menuQuery, pageQuery, defaultQuery, footerQuery} from '../lib/queries';

const Page = ({data}) => {
  const {menuData, mainData, defaultData, footerData} = data;

  const hasGrid = element => element._type === 'gridblock';

  return (
    <Layout {...data}>
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

export async function getServerSideProps(context) {
  const data = await fetchQuery(
    `{
        "mainData": ${pageQuery(context.params.slug)},
        "menuData": ${menuQuery},
        "defaultData": ${defaultQuery},
        "footerData": ${footerQuery}
    }`,
    context.preview
  );
  return {props: {data}};
}

export default Page;
