/** @jsx jsx */
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {Styled, jsx} from 'theme-ui';
import {Link} from 'react-router-dom';
import Form from './form';
import GridBlock from './grid-block';
import Card from './card-grid-item';
import HorizontalCard from './horizontal-card-grid-item';
import Overlay from './overlay-grid-item';

const getHeading = (children) => ({
  h1: <Styled.h1>{children}</Styled.h1>,
  h2: <Styled.h2>{children}</Styled.h2>,
  h3: <Styled.h3>{children}</Styled.h3>,
  h4: <Styled.h4>{children}</Styled.h4>,
  h5: <Styled.h5>{children}</Styled.h5>,
  h6: <Styled.h6>{children}</Styled.h6>,
  normal: <Styled.p>{children}</Styled.p>
});

const BlockRenderer = (props) => {
  const style = props.node.style || 'normal';

  return getHeading(props.children)[style];
};

const CustomStyleSerializer = ({children}) => {
  return <Styled.p>{children}</Styled.p>;
};

const AnchorSerializer = ({children, mark}) => {
  return <span id={mark.id}>{children}</span>;
};

const GridBlockSerializer = ({node: {blocks, columns, style}}) => {
  return (
    <GridBlock
      items={blocks}
      columns={
        (columns === undefined) | null
          ? `repeat(auto-fit, minmax(200px, 1fr))`
          : `repeat(${columns}, 1fr)`
      }
      columnRawValue={(columns === undefined) | null ? 1 : columns}
      gap="20px"
      style={style}
      marginBottom="0"
      renderProp={(data, style) =>
        style === 'card' ? (
          <Card {...data} />
        ) : style === 'overlay' ? (
          <Overlay {...data} />
        ) : style === 'horizontal' ? (
          <HorizontalCard {...data} />
        ) : (
          ''
        )
      }
    />
  );
};

const FormSerializer = ({node: {header, id, body, fields}}) => {
  return <Form header={header} id={id} description={body} fields={fields} />;
};

const InternalLinkSerializer = ({mark, children}) => {
  return <Link to={`/${mark.slug}`}>{children}</Link>;
};

const HomeBlock = ({blocks}) => (
  <BlockContent
    blocks={blocks}
    serializers={{
      types: {
        block: BlockRenderer,
        p: CustomStyleSerializer,
        form: FormSerializer,
        gridblock: GridBlockSerializer
      },
      marks: {
        anchor: AnchorSerializer,
        internalLink: InternalLinkSerializer
      }
    }}
  />
);

export default HomeBlock;
