/** @jsx jsx */
import React from 'react';
import {jsx, ThemeProvider} from 'theme-ui';
import BlockText from './block-text-serializer';
const Banner = ({header, body}) => {
  return (
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
      </div>
    </ThemeProvider>
  );
};

export {Banner};
