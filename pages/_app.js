import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import App from 'next/app';
import Router from 'next/router'
import * as gtag from '../lib/google-analytics'
import {ThemeProvider, Styled} from 'theme-ui';
import theme from '../theme';
require('typeface-lato'); //eslint-disable-line
require('typeface-open-sans'); //eslint-disable-line


const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return(
    <ThemeProvider theme={theme}>
        <Styled.root>
          <Component {...pageProps} />
        </Styled.root>
      </ThemeProvider>
  )
}

export default MyApp


