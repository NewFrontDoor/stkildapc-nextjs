export default {
  nav: {
    textDecoration: 'none',
    fontFamily: 'body',
    color: 'body',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      color: 'accent'
    }
  },
  ghost: {
    margin: 'auto',
    textDecoration: 'none',
    padding: '11px 23px',
    border: '2px solid',
    borderColor: 'gold',
    color: 'gold',
    display: 'inline-block',
    width: 'fit-content',
    ':hover': {
      borderColor: 'gold',
      backgroundColor: 'gold',
      color: 'red'
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
