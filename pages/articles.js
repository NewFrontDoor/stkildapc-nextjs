/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../components/block-text-serializer';
import Layout from '../components/layout';
import {menuQuery, pageQuery, defaultQuery, footerQuery, allArticlesQuery} from '../lib/queries';
import Link from '../components/link';
import { blocksToText } from '../lib/sanity-fns';

const Page = ({data}) => {
  const {menuData, mainData, defaultData, footerData, articles} = data;

  const hasGrid = element => element._type === 'gridblock';

  return (
    <Layout {...data}>
      <article
        sx={{
          maxWidth: '1200px',
          margin: 'auto',
          padding: '15px'
        }}
      >
        <Styled.h2 sx={{textAlign: 'center'}}>{mainData.title}</Styled.h2>
        <SanityBlock blocks={mainData.body} />
        <div sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        {articles.map(item => {
          return (
            <div key={item.title} sx={{flexBasis: ['100%', '46%']}}>
        <Styled.h3 sx={{marginBlockStart: '.5em', marginBlockEnd: '.5em'}}>
          <Link link={item.url}>{item.title}</Link>
        </Styled.h3>
        <Styled.p>{item.author}</Styled.p>
        <Styled.p
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,
            overflow: 'hidden'
          }}
        >
          {blocksToText(item.body)}
        </Styled.p>
        <Styled.p>
          <Link link={item.url}>Read More →</Link>
        </Styled.p>
      </div>
          );
        })}
        </div>
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
        "mainData": ${pageQuery('articles')},
        "menuData": ${menuQuery},
        "articles": ${allArticlesQuery},
        "defaultData": ${defaultQuery},
        "footerData": ${footerQuery}
    }`,
    context.preview
  );
  return {props: {data}};
}

export default Page;
