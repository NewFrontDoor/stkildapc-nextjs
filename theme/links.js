export default {
  nav: {
    textDecoration: 'none',
    fontFamily: 'body',
    color: 'primary',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      color: 'accent'
    }
  },
  home: {
    display: 'inline-block',
    fontFamily: 'body',
    borderRadius: '3px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'background',
    fontSize: 16,
    padding: '20px 40px',
    width: 'fit-content',
    minWidth: '250px',
    margin: 'auto',
    cursor: 'pointer',
    color: 'background',
    textDecoration: 'none',
    '&:hover': {
      bg: 'background',
      color: 'text'
    }
  },
  ghost: {
    margin: 'auto',
    textDecoration: 'none',
    padding: '11px 23px',
    border: '2px solid',
    borderColor: 'alt',
    color: 'alt',
    display: 'inline-block',
    width: 'fit-content',
    ':hover': {
      borderColor: 'alt',
      backgroundColor: 'alt',
      color: 'black'
    }
  },
  warning: {
    margin: 'auto',
    textDecoration: 'none',
    padding: '11px 23px',
    border: '2px solid red',
    color: 'red',
    display: 'block',
    width: 'fit-content',
    ':hover': {
      borderColor: 'red',
      backgroundColor: 'red',
      color: '#fff'
    }
  },
  rectangle: {
    padding: '11px 23px',
    border: '2px solid #52934f',
    color: '#52934f',
    ':hover': {
      borderColor: '#63bc50',
      backgroundColor: '#63bc50',
      color: '#fff'
    }
  },
  footer: {
    fontFamily: 'body',
    fontWeight: 'body',
    color: 'background',
    textDecoration: 'none',
    '&:visited': {
      color: 'background'
    },
    '&:hover': {
      color: 'accent'
    },
    '&:active': {
      color: 'accent'
    }
  }
};
