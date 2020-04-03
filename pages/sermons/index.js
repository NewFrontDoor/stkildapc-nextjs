/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import {SermonTable} from '@newfrontdoor/sermon';
import SanityBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import Link from '../../components/link';
import SermonGrid from '../../components/sermon-grid';
import {
  pageQuery,
  menuQuery,
  sermonQuery,
  seriesQuery,
  defaultQuery
} from '../../lib/queries';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'speaker', searchable: true},
  {
    heading: 'Date Preached',
    key: 'preachedDate',
    searchable: false,
    hideable: true
  }
];

const Sermons = ({mainData, sermonData, seriesData, menuData, defaultData}) => {
  const sermonsSubset = sermonData.slice(0, 10);
  return (
    <Layout
      wide
      menuData={menuData}
      mainData={mainData}
      defaultData={defaultData}
    >
      <SanityBlock blocks={mainData.body} />
      <SermonGrid
        sermons={sermonData}
        series={seriesData}
        config={defaultData}
      />
      <SermonTable
        sermons={sermonsSubset}
        headers={headers}
        columnHide={[5]}
        sermonDirectory="sermons"
        renderLink={(directory, slug, title) => (
          <Link link={`${directory}/${slug}`}>{title}</Link>
        )}
      />
    </Layout>
  );
};

Sermons.propTypes = {
  mainData: PropTypes.object.isRequired,
  sermonData: PropTypes.array.isRequired,
  seriesData: PropTypes.array,
  menuData: PropTypes.object.isRequired,
  defaultData: PropTypes.object
};

Sermons.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
        "menuData": ${menuQuery},
        "mainData": ${pageQuery('sermons')},
        "sermonData": ${sermonQuery},
        "seriesData": ${seriesQuery},
        "defaultData": ${defaultQuery}
    }`
  );
  return results;
};

export default Sermons;
