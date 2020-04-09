/** @jsx jsx */
import React, {useState, useEffect} from 'react';
import {jsx, ThemeProvider, Close} from 'theme-ui';
import BlockText from './block-text-serializer';

const Banner = ({header, body}) => {
  const [hidden, setHidden] = useState(false);

  const handleClose = () => {
    sessionStorage.setItem('bannerVisible', false);
    setHidden(true);
  };

  useEffect(() => {
    setHidden(sessionStorage.getItem('bannerVisible'));
  }, []);

  return (
    !hidden && (
      <ThemeProvider
        theme={{
          styles: {
            p: {
              fontSize: 16,
              fontFamily: 'body',
              fontWeight: 'body',
              lineHeight: 'body',
              color: 'white',
              margin: 0
            },
            a: {
              color: 'gold',
              ':visited': 'white'
            }
          }
        }}
      >
        <div
          sx={{
            backgroundColor: 'alt',
            display: 'block',
            textAlign: 'center',
            padding: '15px',
            color: 'white'
          }}
        >
          <BlockText blocks={body} />
          <Close
            sx={{position: 'absolute', top: '20px', right: '30px'}}
            onClick={handleClose}
          />
        </div>
      </ThemeProvider>
    )
  );
};

export {Banner};
