/** @jsx jsx */
import PropTypes from 'prop-types';
import urlFor from '../lib/sanityImg';
import BlockText from './block-text-serializer';
import {jsx, Styled} from 'theme-ui';

const PeopleCard = ({name, body, image}) => {
  return (
    <>
      <div
        sx={{
          width: ['100%', '130px', '165px'],
          height: [null, '130px', '165px'],
          paddingBottom: ['100%', 0],
          position: 'relative',
          margin: 'auto'
        }}
      >
        <img
          src={urlFor(image)
            .width(172)
            .auto('format')
            .url()}
          alt={name}
          sx={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
            borderWidth: '4px',
            borderColor: '#27ae60',
            borderStyle: 'solid',
            borderRadius: '50%'
          }}
        />
      </div>
      <div>
        <Styled.h3
          sx={{
            gridColumn: '1/1',
            maxWidth: '100%',
            textAlign: ['left', 'center'],
            margin: [null, '0.5em']
          }}
        >
          {name}
        </Styled.h3>

        <div sx={{fontSize: '16px', color: 'text', textAlign: ['left', 'center']}}>
          {body}
        </div>
      </div>
    </>
  );
};

PeopleCard.propTypes = {
  body: PropTypes.object,
  name: PropTypes.string.isRequired,
  image: PropTypes.any
};

PeopleCard.defaultProps = {
  body: null,
  image: null
};

export default PeopleCard;
