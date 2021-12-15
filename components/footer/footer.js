/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import React from 'react';
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaVimeo,
  FaGithub,
  FaTwitterSquare,
  FaSpotify,
  FaLinkedin,
  FaSnapchatSquare,
  FaPhoneSquare
} from 'react-icons/fa';
import {IconContext, icons} from 'react-icons';
import Navlink from '../header/nav-link';
import Link from '../link';
import {Slimline} from '@newfrontdoor/footer';

const socialIcons = {
  facebook: <FaFacebookSquare />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  vimeo: <FaVimeo />,
  twitter: <FaTwitterSquare />,
  github: <FaGithub />,
  spotify: <FaSpotify />,
  linkedin: <FaLinkedin />,
  snapchat: <FaSnapchatSquare />,
  mailto: <FaEnvelope />,
  tel: <FaPhoneSquare />
};

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
    display: 'inline-block',
    padding: ['10px', '0']
  }
};

const Footer = ({data: {footermenu, tagline, sociallinks, copyright}}) => {
  return [
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
          {footermenu.map((item) => (
            <>
            <Navlink
              key={item._key}
              link={item.pageType === "restrictedPage" ? `restricted/${item.slug.current}` : item.slug.current}
              text={item.text}
            />
            </>
          ))}
        </ul>
        <div sx={{padding: '20px 0'}}>
          <IconContext.Provider
            value={{size: '1.8em', style: {margin: '0 8px'}}}
          >
            {sociallinks.map((item) => {
              const type = Object.keys(socialIcons).filter((type) =>
                item.includes(type)
              )[0];

              return (
                <a
                  key={item}
                  href={item}
                  sx={{color: 'black', ':hover': {color: 'accent'}}}
                >
                  {socialIcons[type]}
                </a>
              );
            })}
          </IconContext.Provider>
        </div>
        <p>{copyright}</p>
      </div>
    </div>,
    <Slimline />
  ];
};

export default Footer;
