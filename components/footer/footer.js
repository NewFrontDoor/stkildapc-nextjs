/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import React from 'react';
import {FaFacebookF, FaInstagram, FaYoutube, FaEnvelope} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import Navlink from '../header/nav-link';

const footerInner = {
  maxWidth: '1170px',
  margin: 'auto',
  minHeight: '1em',
  fontSize: '0.85rem',
  textAlign: 'center'
};

const list = {
  listStyleType: 'none',
  textAlign: 'center',
  padding: '0',
  paddingTop: '60px',
  fontSize: '16px',
  li: {
    display: 'inline-block'
  }
};

const Footer = ({data: {footermenu, tagline}}) => {
  return (
    <div sx={{padding: '2rem 0'}}>
      <div sx={footerInner}>
        <h4
          sx={{
            fontSize: '1.4em',
            fontStyle: 'italic'
          }}
        >
          {tagline}
        </h4>
        <ul sx={list}>
          {footermenu.map(item => (
            <Navlink key={item._key} link={item.pathname} text={item.text} />
          ))}
        </ul>
        <div sx={{padding: '20px 0'}}>
          <IconContext.Provider
            value={{size: '1.8em', style: {margin: '0 8px'}}}
          >
            <FaFacebookF /> <FaInstagram /> <FaYoutube /> <FaEnvelope />
          </IconContext.Provider>
        </div>
        <p>© 2019 New Front Door</p>
      </div>
    </div>
  );
};

export default Footer;
