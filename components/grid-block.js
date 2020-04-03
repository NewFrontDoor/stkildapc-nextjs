/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx, Styled} from 'theme-ui';

const gridSx = ({gap, columns, columnRawValue, margin, style, padding}) => ({
  display: 'grid',
  gridTemplateRows: 'auto',
  padding: '0 30px',
  gap,
  padding,
  margin: [0, 0, `${style === 'homecard' ? '' : margin}`],
  backgroundColor: `${style === 'people' ? '#efede4' : ''}`,
  gridTemplateColumns: [
    null,
    null,
    `repeat(${Math.round(columnRawValue / 2)}, 1fr)`,
    columns
  ]
});

const GridBlock = ({
  items,
  renderProp,
  margin,
  padding,
  style,
  gap,
  columns,
  columnRawValue,
  header
}) => {
  return (
    <div sx={gridSx({gap, columns, columnRawValue, margin, padding, style})}>
      {header && (
        <div sx={{gridColumn: '1/-1', textAlign: 'center', marginTop: '40px'}}>
          <Styled.h1 sx={{fontWeight: 400}}>{header}</Styled.h1>
        </div>
      )}
      {items.map(item => {
        return item.id ? (
          <div key={item._key} /> // A blank item, with a name on the property 'id'
        ) : (
          <div
            key={item._key}
            sx={{
              display: 'grid',
              gridTemplateColumns: ['125px 1fr', '125px 1fr', '1fr'],
              gridGap: ['0 20px', '0 20px', null]
            }}
          >
            {renderProp(item, style)}
          </div>
        );
      })}
    </div>
  );
};

GridBlock.propTypes = {
  header: PropTypes.string,
  columnRawValue: PropTypes.number.isRequired,
  columns: PropTypes.string.isRequired,
  gap: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _key: PropTypes.string.isRequired
    })
  ),
  margin: PropTypes.string,
  renderProp: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired
};

GridBlock.defaultProps = {
  header: '',
  gap: '5%'
};

export default GridBlock;
