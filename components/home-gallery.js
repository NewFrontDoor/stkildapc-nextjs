/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {Styled, jsx} from 'theme-ui';
import styled from '@emotion/styled';
import Link from './link';
import urlFor from '../lib/sanityImg';
import {blocksToText} from '../lib/sanity-fns';

const Grid = styled('div')`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 30px;
  @media (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function Events({items}) {
  return items.map(item => {
    const date = new Date(item.date);
    return (
      <div key={item.title}>
        <img
          src={urlFor(item.image)
            .width(300)
            .height(300)
            .url()}
          sx={{maxWidth: '100%'}}
        />
        <Styled.p sx={{textAlign: 'center'}}>
          <Link link={item.url}>{item.title}</Link>
          <br />
          {item.date &&
            date.toLocaleDateString('en-AU', {month: 'short'}) +
              ' ' +
              date.toLocaleDateString('en-AU', {day: 'numeric'}) +
              ', ' +
              date.toLocaleDateString('en-AU', {year: 'numeric'}) +
              ' · '}
          {item._type}
        </Styled.p>
      </div>
    );
  });
}

function Articles({items}) {
  return items.map(item => {
    return (
      <div key={item.title}>
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
  });
}

function Videos({items}) {
  return items.map(item => {
    return (
      <div key={item.title}>
        <Styled.p sx={{textAlign: 'center'}}>
          <Styled.h3>
            <Link link={item.url}>{item.title}</Link>
          </Styled.h3>
          VIDEO
        </Styled.p>
      </div>
    );
  });
}

const getGalleryType = items => ({
  event: <Events items={items} />,
  article: <Articles items={items} />,
  video: <Videos items={items} />
});

export default function HomeGallery({heading, subheading, items, type}) {
  return (
    <>
      <Styled.h2
        sx={{
          borderBottomStyle: 'solid',
          borderBottomColor: 'black',
          borderBottomWidth: '1px',
          width: 'fit-content',
          paddingRight: '5px'
        }}
      >
        {heading}
      </Styled.h2>
      <Styled.p>{subheading}</Styled.p>
      <Grid>{getGalleryType(items)[type]}</Grid>
      <hr />
    </>
  );
}

HomeGallery.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};
