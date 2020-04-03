import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ParallaxGroup = styled('div')`
  position: relative;
  height: 70vh;
  transform-style: preserve-3d;
`;

const ParallaxBack = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(-1px) scale(2);
  background: ${props => `url(${props.img});`};
`;

const ParallaxBase = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(0);
`;

export default function Parallax({img, children}) {
  return (
    <Wrapper>
      <ParallaxGroup>
        <ParallaxBase>{children}</ParallaxBase>
        <ParallaxBack img={img} />
      </ParallaxGroup>
    </Wrapper>
  );
}
