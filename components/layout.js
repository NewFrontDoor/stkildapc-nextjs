/** @jsx jsx */
import React from 'react';
import {jsx, Grid, Container, Styled} from 'theme-ui';
import PropTypes from 'prop-types';
import Header from './header/header';
import Footer from './footer/footer';
import Head from 'next/head';
import urlFor from '../lib/sanityImg';

const Layout = ({menuData, mainData, defaultData, footerData, children}) => {
  return (
    <div>
      <Head>
        <title>{/* mainData.title */} | St Kilda Presbyterian</title>
      </Head>
      <Header navlinks={menuData.menuitems} />
      {children}
      <Footer data={footerData} />
    </div>
  );
};

Layout.propTypes = {
  menuData: PropTypes.object.isRequired,
  mainData: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;
