/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from './link';
import urlFor from '../lib/sanityImg';
import BlockText from './block-text-serializer';
import {jsx, Styled} from 'theme-ui';

const actionSx = {
  margin: [null, null, 'auto'],
  textDecoration: 'none',
  padding: '11px 23px',
  border: '2px solid #52934f',
  color: '#52934f',
  ':hover': {
    borderColor: '#63bc50',
    backgroundColor: '#63bc50',
    color: '#fff'
  }
};

const LinkWrapper = ({link, children}) =>
  link ? (
    <Link link={link} sx={{display: 'contents'}}>
      {children}
    </Link>
  ) : (
    children
  );

const Card = ({header, description, shortdescription, image, link, action}) => {
  return (
    <>
      <LinkWrapper link={link}>
        <img
          src={urlFor(image)
            .width(275)
            .auto('format')
            .url()}
          alt={header}
          sx={{
            width: '100%',
            height: ['100%', '100%', 'auto'],
            gridColumn: ['1/2', '1/2', '1/1'],
            margin: 'auto',
            marginBottom: '40px',
            objectFit: 'cover',
            gridRow: ['1/4', '1/4', '1/1']
          }}
        />
        <Styled.h3
          sx={{
            gridColumn: ['2/3', '2/3', '1/1'],
            maxWidth: '100%',
            textAlign: ['left', 'left', 'center'],
            margin: [null, null, '0.5em']
          }}
        >
          {header}
        </Styled.h3>
      </LinkWrapper>
      <p
        sx={{
          fontSize: '16px',
          color: 'black',
          gridColumn: ['2/3', '2/3', '1/1'],
          marginTop: [0, 0, null],
          textAlign: ['left', 'left', 'center']
        }}
      >
        {description}
      </p>
      {shortdescription && <Styled.p>{shortdescription}</Styled.p>}
      {link && (
        <div
          sx={{
            display: 'flex',
            gridColumn: ['2/3', '2/3', '1/1'],
            textAlign: 'center'
          }}
        >
          <Link link={link} passedSx={actionSx}>
            {action}
          </Link>
        </div>
      )}
    </>
  );
};

Card.propTypes = {
  action: PropTypes.string,
  description: PropTypes.object,
  shortdescription: PropTypes.string,
  header: PropTypes.string.isRequired,
  image: PropTypes.any,
  link: PropTypes.string.isRequired
};

Card.defaultProps = {
  action: 'VIEW PAGE',
  description: null,
  shortdescription: null,
  image: null
};

export default Card;
