/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {Styled, Grid, Button, jsx} from 'theme-ui';
import HomeGallery from '../components/home-gallery';
import Parallax from '../components/parallax';
import Layout from '../components/layout';
import StKilda from '../public/stkilda.jpg';
import {mainQuery, menuQuery, footerQuery} from '../lib/queries';
import {fetchQuery} from '../lib/sanity';
import urlFor from '../lib/sanityImg';

const Home = props => {
  const {mainData} = props;
  const {heading, content, services} = mainData;
  return (
    <Layout {...props}>
      <div sx={{background: `url(${urlFor(mainData.mainImage)})`, backgroundSize: 'cover'}}>
        <Grid
          sx={{
            gridTemplateColumns: '1fr 3fr 1fr',
            gridTemplateRows: '1fr 3fr 1fr',
            position: 'relative',
            color: 'white',
            height: [null, null, '70vh']
          }}
        >
          <div
            sx={{
              gridArea: '2 / 2 / 3 / 3'
            }}
          >
            <Styled.h1
              sx={{
                fontSize: '40px',
                color: 'background',
                textAlign: 'center'
              }}
            >
              {heading}
            </Styled.h1>
            <hr />
            <Grid
              sx={{
                textAlign: 'center',
                gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
                gridGap: ['10px', '10px', '20px']
              }}
            >
              {services.map(service => (
                <div key={service.key}>
                  <Styled.h4>{service.address}</Styled.h4>
                  <Button variant="home">{service.text}</Button>
                </div>
              ))}
            </Grid>
          </div>
        </Grid>
      </div>
      <div
        sx={{
          padding: ['0 20px', '0 36px', '0 48px', '0 64px', '0 185px'],
          backgroundColor: 'white'
        }}
      >
        {content.map(segment => {
          return (
            <HomeGallery
              key={segment.key}
              heading={segment.heading}
              subheading={segment.subheading}
              items={segment.items}
              type={segment.type}
            />
          );
        })}
      </div>
    </Layout>
  );
};

Home.propTypes = {
  mainData: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ).isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string.isRequired,
        blurb: PropTypes.string,
        actions: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
          })
        ).isRequired
      })
    ).isRequired
  })
};

Home.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
      'menuData': ${menuQuery},
      'mainData': ${mainQuery},
      'footerData': ${footerQuery}
    }`
  );
  return results;
};

export default Home;
