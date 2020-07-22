/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx, Styled} from 'theme-ui';
import {StyledPlayer} from '@newfrontdoor/audio-player';
import Layout from '../../components/layout';
import Link from '../../components/link';
import {fetchQuery} from '../../lib/sanity';
import {
  mainQuery,
  menuQuery,
  defaultQuery,
  sermonSlugQuery
} from '../../lib/queries';

const main = {
  maxWidth: '700px',
  margin: 'auto',
  padding: '15px',
  fontSize: '1.15em',
  lineHeight: '1.8',
  color: 'text'
};

const returnDay = number => {
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return null;
  }
};

const returnMonth = number => {
  switch (number) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return null;
  }
};

const SermonPage = ({data: {sermonData, menuData, mainData, defaultData}}) => {
  const datePreached = new Date(sermonData.preachedDate);

  return (
    <Layout menuData={menuData} mainData={mainData} defaultData={defaultData}>
      <Styled.h3>{sermonData.title}</Styled.h3>
      <StyledPlayer
        hasPlaybackSpeed
        hasBorder
        isInvert
        highlight="#c4dbf6"
        background="#4c516d"
        base="#4c516d"
        audio={sermonData.url}
        width="300px"
      />
      <Link download link={sermonData.url}>
        Download
      </Link>
      <p sx={{fontSize: '16px', lineHeight: '18px'}}>
        Speaker - {sermonData.speaker}
      </p>
      <p sx={{fontSize: '16px', lineHeight: '18px'}}>
        Series - {sermonData.series}
      </p>
      {datePreached && (
        <p sx={{fontSize: '16px', lineHeight: '18px', fontStyle: 'italic'}}>
          {`${returnDay(datePreached.getDay())}, ${returnMonth(
            datePreached.getMonth()
          )} ${datePreached.getDate()}, ${datePreached.getFullYear()}`}
        </p>
      )}
    </Layout>
  );
};

SermonPage.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired,
  sermonData: PropTypes.array
};

export async function getServerSideProps({query}) {
  const data = await fetchQuery(
    `{
        "mainData": ${mainQuery},
        "menuData": ${menuQuery},
        "sermonData": ${sermonSlugQuery(query.slug)},
        "defaultData": ${defaultQuery}
    }`
  );
  return {props: {data}};
}

export default SermonPage;
