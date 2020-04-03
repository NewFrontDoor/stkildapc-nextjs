/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import urlFor from '../lib/sanityImg';

const HomeLayout = props => {
  const {background} = props;

  return (
    <section>
      <img
        src={urlFor(background)
          .height(550)
          .url()}
        sx={{objectFit: 'cover', width: '100%'}}
      />
    </section>
  );
};

HomeLayout.propTypes = {
  background: PropTypes.object
};

export default HomeLayout;
