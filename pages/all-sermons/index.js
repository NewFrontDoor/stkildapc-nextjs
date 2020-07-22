/** @jsx jsx */
import {useState} from 'react';
import PropTypes from 'prop-types';
import Link from '../../components/link';
import {SermonTable} from '@newfrontdoor/sermon';
import {SearchCollection as SermonFilter} from '@newfrontdoor/search';
import HomeBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import {
  pageQuery,
  menuQuery,
  sermonQuery,
  defaultQuery,
  footerQuery
} from '../../lib/queries';
import {jsx, Styled, Grid} from 'theme-ui';

const fields = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'speaker', searchable: true},
  {heading: 'Date Preached', key: 'preachedDate', searchable: false}
];

const AllSermons = ({
  data: {pageData, menuData, sermonData, defaultData, footerData}
}) => {
  const [sermonsSubset, setSubset] = useState(sermonData);

  return (
    <Layout
      menuData={menuData}
      mainData={pageData}
      defaultData={defaultData}
      footerData={footerData}
    >
      <article
        sx={{
          maxWidth: '1200px',
          margin: 'auto',
          padding: '15px'
        }}
      >
        <HomeBlock blocks={pageData.body} />
        <Grid columns={2}>
          <SermonFilter
            dataCollection={sermonData}
            setSubset={setSubset}
            fields={fields}
            debounceTime={500}
            labels={{
              searchbox: 'Filter sermons:',
              checkbox: `use 'inclusive' mode`
            }}
          />
        </Grid>
        <SermonTable
          sermons={sermonsSubset}
          headers={fields}
          columnHide={[5]}
          sermonDirectory="sermons"
          renderLink={(directory, slug, title) => (
            <Link link={`${directory}/${slug}`}>{title}</Link>
          )}
        />
      </article>
    </Layout>
  );
};

AllSermons.propTypes = {
  pageData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired,
  sermonData: PropTypes.array
};

export async function getServerSideProps() {
  const data = await fetchQuery(
    `{
        "menuData": ${menuQuery},
        "pageData": ${pageQuery('all-sermons')},
        "sermonData": ${sermonQuery},
        "defaultData": ${defaultQuery},
        "footerData": ${footerQuery}
    }`
  );
  return {props: {data}};
}



export default AllSermons;
